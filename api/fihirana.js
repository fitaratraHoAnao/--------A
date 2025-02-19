const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const router = express.Router();

// Fonction pour récupérer les paroles d'une chanson spécifique
async function getSongLyrics(category, title) {
    const url = `https://fihirana.org/ffpm/${category}/${title}/`;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const lyrics = [];

        $('div.entry-content p').each((i, el) => {
            const malagasyText = $(el).text().trim();
            lyrics.push(malagasyText);
        });

        if (lyrics.length === 0) throw new Error("Paroles non trouvées");
        return lyrics;
    } catch (error) {
        throw new Error("Impossible d'accéder au site");
    }
}

// Fonction pour récupérer les catégories de chansons
async function getCategories() {
    const url = "https://fihirana.org/category/ffpm/ny-telo-izay-iray/";

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const categories = [];

        $('.widget_categories ul li a').each((i, el) => {
            const text = $(el).text().trim().replace("\u2013", "-");
            if (!["Fihirana Fanampiny", "Non classé"].includes(text)) {
                categories.push(text);
            }
        });

        if (categories.length === 0) throw new Error("Aucune catégorie trouvée");
        return categories;
    } catch (error) {
        throw new Error("Impossible d'accéder au site");
    }
}

// Route pour récupérer les paroles d'une chanson spécifique
router.get('/hira', async (req, res) => {
    const category = req.query.categorie || 'ny-fanahy-masina';
    const title = req.query.titre;

    if (!title) {
        return res.status(400).json({ error: "Le paramètre 'titre' est requis" });
    }

    try {
        const lyrics = await getSongLyrics(category, title);
        res.json({ titre: title, paroles: lyrics });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour récupérer les catégories de chansons
router.get('/categorie', async (req, res) => {
    const liste = req.query.liste;

    if (liste !== "FFPM") {
        return res.status(400).json({ error: "Paramètre 'liste' invalide" });
    }

    try {
        const categories = await getCategories();
        res.json({ CATEGORIES: categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 404
router.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée" });
});

module.exports = router;
