const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const router = express.Router();

// Fonction pour scraper un verset spécifique
const scraper = async (verset) => {
    const url = `https://www.bible.com/fr/bible/873/${verset}`;

    try {
        const { data } = await axios.get(url); // Récupérer la page HTML
        const $ = cheerio.load(data); // Charger le contenu HTML avec Cheerio

        // Extraire les informations nécessaires
        const contenu = $('meta[name="description"]').attr('content'); // Description dans meta
        const reference = verset.replace('GENESISY', 'Genesisy'); // Ajuster la référence si besoin

        // Retourner les données sous forme d'objet JSON sans le titre
        return {
            verset: reference,
            contenu: contenu
        };
    } catch (error) {
        console.error("Erreur lors du scraping: ", error);
        return { error: 'Erreur lors du scraping du verset' };
    }
};

// Route GET pour rechercher un verset spécifique
app.get('/', async (req, res) => {
    const verset = req.query.verset; // Correction du paramètre 'verser' en 'verset'

    if (!verset) {
        return res.status(400).json({ error: 'Veuillez spécifier un verset via le paramètre verset' });
    }
    
    const resultat = await scraper(verset);
    res.json(resultat);
});

// Route 404 pour les chemins non trouvés
router.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

module.exports = router;
