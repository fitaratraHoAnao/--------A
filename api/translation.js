const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// Fonction de traduction utilisant l'API MyMemory
async function translateText(text, targetLang) {
    const url = 'https://api.mymemory.translated.net/get';

    try {
        // Appel à l'API MyMemory pour détecter la langue source et effectuer la traduction
        const response = await axios.get(url, {
            params: {
                q: text,
                langpair: `auto|${targetLang}`  // 'auto' pour détecter automatiquement la langue source
            }
        });

        // Vérifie si la réponse est valide
        if (!response.data.responseData.translatedText) {
            throw new Error('Erreur lors de la traduction');
        }

        // Récupérer le texte traduit
        const translatedText = response.data.responseData.translatedText;
        
        // Formater les résultats pour l'affichage
        return `🎉 Texte original : ${text}\n\n🔑 Traduction : ${translatedText}`;
    } catch (error) {
        if (error.response) {
            return `Erreur lors de la récupération des données : ${error.response.status}`;
        } else {
            return `Une erreur inattendue s'est produite : ${error.message}`;
        }
    }
}

// Route pour la traduction
router.get('/', async (req, res) => {
    const { text, langue } = req.query;

    // Vérifie que le texte et la langue cible sont fournis
    if (!text || !langue) {
        return res.status(400).json({ error: 'Text et langue sont requis' });
    }

    try {
        // Effectuer la traduction
        const translatedText = await translateText(text, langue);
        res.json({ response: translatedText });
    } catch (error) {
        console.error('Erreur lors de la traduction:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Route 404 pour les chemins non trouvés
router.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

module.exports = router;
