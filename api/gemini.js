const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const router = express.Router();
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ Erreur : GEMINI_API_KEY non définie dans .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Stockage en mémoire des conversations
const conversationHistory = {};

// Configuration du modèle
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

router.get('/gemini', async (req, res) => {
    try {
        const { prompt, uid, image } = req.query;

        if (!uid || !prompt) {
            return res.status(400).json({ error: "UID et prompt requis." });
        }

        // Initialiser l'historique si ce n'est pas encore fait
        if (!conversationHistory[uid]) {
            conversationHistory[uid] = [];
        }

        // Ajouter le message de l'utilisateur dans l'historique
        const userMessage = { role: "user", parts: [{ text: prompt }] };
        conversationHistory[uid].push(userMessage);

        let chatSession;
        
        if (image) {
            // Si une image est fournie, créer une session avec l'image
            chatSession = model.startChat({
                generationConfig,
                history: conversationHistory[uid],
            });

            // Ajouter l'image à la conversation
            conversationHistory[uid].push({
                role: "user",
                parts: [
                    { text: prompt },
                    { fileData: { mimeType: "image/jpeg", fileUri: image } }
                ]
            });
        } else {
            // Session normale sans image
            chatSession = model.startChat({
                generationConfig,
                history: conversationHistory[uid],
            });
        }

        // Envoyer la requête à Gemini
        const result = await chatSession.sendMessage(prompt);
        const responseText = result.response.text();

        // Ajouter la réponse du modèle à l'historique
        conversationHistory[uid].push({ role: "assistant", parts: [{ text: responseText }] });

        res.json({ response: responseText });

    } catch (error) {
        console.error("❌ Erreur API Gemini:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Erreur lors de la requête à Gemini.", details: error.message });
    }
});

module.exports = router;
