const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// Fonction de traduction utilisant MyMemory
async function translateText(text, targetLang) {
    const url = 'https://api.mymemory.translated.net/get';

    try {
        const response = await axios.get(url, {
            params: {
                q: text,
                langpair: `auto|${targetLang}` // Détection automatique de la langue source
            }
        });

        if (!response.data.responseData.translatedText) {
            throw new Error('Erreur lors de la traduction');
        }

        const translatedText = response.data.responseData.translatedText;

        return `🎉 Texte original : ${text}\n\n🔑 Traduction : ${translatedText}`;
    } catch (error) {
        console.error('Erreur lors de la traduction:', error);
        return `Une erreur s'est produite : ${error.message}`;
    }
}

// Route pour la traduction
router.get('/', async (req, res) => {
    const { text, langue } = req.query;

    if (!text || !langue) {
        return res.status(400).json({ error: 'Text et langue sont requis' });
    }

    try {
        const translatedText = await translateText(text, langue);
        res.json({ response: translatedText });
    } catch (error) {
        console.error('Erreur lors de la traduction:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Route 404
router.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

module.exports = router;
