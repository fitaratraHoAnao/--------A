const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const router = express.Router();

router.get('/parole', async (req, res) => {
    const { mpihira, titre } = req.query;

    if (!mpihira || !titre) {
        return res.status(400).json({ error: 'Les paramètres "mpihira" et "titre" sont requis.' });
    }

    const url = `https://tononkira.serasera.org/hira/${mpihira.toLowerCase()}/${titre.toLowerCase().replace(/ /g, '-')}`;

    try {
        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        const $ = cheerio.load(data);

        // Extraire le titre
        const titreChanson = $('h2.border-bottom').text().trim();

        // Extraire les paroles et filtrer les lignes indésirables
        let paroles = [];
        $('div.col-md-8').find('br').replaceWith('\n');
        const parolesTexte = $('div.col-md-8').text().split('\n');

        parolesTexte.forEach(line => {
            const ligne = line.trim();
            if (ligne && ![titreChanson, 'Ahitsio', "(Nalaina tao amin'ny tononkira.serasera.org)"].includes(ligne)) {
                paroles.push(ligne);
            }
        });

        // Extraire le lien MP3
        const mp3 = $('audio.media').attr('src') || '';

        // Construire la réponse JSON
        const resultat = {
            titre: titreChanson,
            paroles,
            mp3
        };

        res.json(resultat);
    } catch (error) {
        console.error('Erreur de scraping :', error.message);
        res.status(500).json({ error: 'Impossible de récupérer les informations.', details: error.message });
    }
});

router.get('/mpanakanto', async (req, res) => {
    const { anarana } = req.query;

    if (!anarana) {
        return res.status(400).json({ error: "Paramètre 'anarana' requis" });
    }

    const url = `https://tononkira.serasera.org/mpihira/${anarana.toLowerCase()}`;

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Extraction de l'image avec un chemin absolu
        let imagePath = $('.col-md-4 img.img-fluid').attr('src');
        const sary = imagePath && !imagePath.includes('logo.jpg')
            ? (imagePath.startsWith('http') ? imagePath : `https://tononkira.serasera.org${imagePath}`)
            : 'Image non disponible';

        // Extraction des chansons
        const hiranNy = [];
        $('h3:contains("Hiran\'i")').nextAll('div.border').find('a').each((_, link) => {
            const hira = $(link).text().trim();
            if (hira) hiranNy.push(hira);
        });

        // Résultat JSON
        const resultat = {
            sary,
            [`hiran'i ${anarana}`]: hiranNy.length > 0 ? hiranNy : ['Aucune chanson trouvée']
        };

        res.json(resultat);
    } catch (error) {
        console.error('Erreur de récupération :', error.message);
        res.status(500).json({ error: 'Impossible de récupérer les données', details: error.message });
    }
});

// Route 404
router.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée" });
});

module.exports = router;
