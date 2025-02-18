const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Stockage de l'historique des conversations (en mémoire pour cet exemple)
const conversationHistory = {};

async function downloadImage(url) {
    const response = await axios({
        url,
        responseType: 'arraybuffer'
    });
    const tempPath = path.join(__dirname, 'temp.jpg');
    fs.writeFileSync(tempPath, response.data);
    return tempPath;
}

async function uploadToGemini(imagePath) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const file = await model.uploadFile(imagePath);
    return file;
}

router.get('/', async (req, res) => {
    try {
        const prompt = req.query.prompt || "Bonjour, comment ça va ?";
        const uid = req.query.uid;
        const imageUrl = req.query.image;

        if (!uid) {
            return res.status(400).json({ error: "UID manquant" });
        }

        // Initialisation de l'historique de la conversation sans message "system"
        if (!conversationHistory[uid]) {
            conversationHistory[uid] = [
                { role: "user", content: "Bonjour, je suis là pour vous aider !" }
            ];
        }

        if (imageUrl) {
            const imagePath = await downloadImage(imageUrl);
            const file = await uploadToGemini(imagePath);
            if (file) {
                conversationHistory[uid].push({ role: "user", content: [file, prompt] });
            } else {
                return res.status(500).json({ error: "Échec de l'upload de l'image sur Gemini" });
            }
        } else {
            conversationHistory[uid].push({ role: "user", content: prompt });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const chatSession = model.startChat({ history: conversationHistory[uid] });
        const response = await chatSession.sendMessage(prompt);

        const responseText = response.text || "Pas de réponse disponible.";
        conversationHistory[uid].push({ role: "assistant", content: responseText });

        res.json({ response: responseText });
    } catch (error) {
        console.error("Erreur API Gemini:", error);
        res.status(500).json({ error: "Erreur lors de la requête à Gemini." });
    }
});

module.exports = router;
