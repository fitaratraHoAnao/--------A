const express = require('express');
const Groq = require('groq-sdk');
require('dotenv').config();

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Stockage de l'historique des conversations (en mémoire pour cet exemple)
const conversationHistory = {};

router.get('/', async (req, res) => {
    try {
        const question = req.query.q || "Bonjour, comment ça va ?";
        const uid = req.query.uid; // Récupération de l'UID de la requête

        if (!uid) {
            return res.status(400).json({ error: "UID manquant" });
        }

        // Si l'UID n'a pas encore de conversation enregistrée, on initialise l'historique
        if (!conversationHistory[uid]) {
            conversationHistory[uid] = [
                { role: "system", content: "Bonjour, je suis votre assistant." }
            ];
        }

        // Ajouter la question de l'utilisateur à l'historique
        conversationHistory[uid].push({ role: "user", content: question });

        // Effectuer l'appel à l'API Groq avec l'historique de la conversation
        const chatCompletion = await groq.chat.completions.create({
            messages: conversationHistory[uid], // Inclure l'historique des messages
            model: "qwen-2.5-coder-32b",
            temperature: 0.6,
            max_completion_tokens: 4096,
            top_p: 0.95,
            stream: true,
            stop: null
        });

        let responseText = '';
        for await (const chunk of chatCompletion) {
            responseText += chunk.choices[0]?.delta?.content || '';
        }

        // Ajouter la réponse du modèle à l'historique
        conversationHistory[uid].push({ role: "assistant", content: responseText });

        // Envoyer la réponse au client
        res.json({ response: responseText });

    } catch (error) {
        console.error("Erreur API Groq:", error);
        res.status(500).json({ error: "Erreur lors de la requête à Groq." });
    }
});

module.exports = router;
