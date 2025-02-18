const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// Fonction de détection de langue
async function detectLanguage(text) {
    const url = 'https://api.detectlanguage.com/0.2/detect';

    try {
        const response = await axios.post(url, {
            q: text
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.DETECT_LANGUAGE_API_KEY}`
            }
        });

        const detectedLang = response.data.data.detections[0].language;
        return detectedLang;  // Code de langue détecté (par exemple 'fr', 'en', etc.)
    } catch (error) {
        console.error('Erreur lors de la détection de la langue:', error);
        throw new Error('Erreur lors de la détection de la langue');
    }
}

// Fonction de traduction utilisant l'API MyMemory
async function translateText(text, targetLang) {
    const detectedLang = await detectLanguage(text);  // Détecter la langue source
    const url = 'https://api.mymemory.translated.net/get';

    try {
        // Appel à l'API MyMemory pour traduire le texte avec les langues détectées et cibles
        const response = await axios.get(url, {
            params: {
                q: text,
                langpair: `${detectedLang}|${targetLang}`  // Utiliser la langue source détectée
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
        console.error('Erreur lors de la traduction:', error);
        return `Une erreur inattendue s'est produite : ${error.message}`;
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
