const express = require('express');
const Groq = require('groq-sdk');
require('dotenv').config();

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.get('/', async (req, res) => {
    try {
        const question = req.query.question || "Bonjour, comment ça va ?";

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "user", content: question }
            ],
            model: "deepseek-r1-distill-qwen-32b",
            temperature: 0.6,
            max_completion_tokens: 4096,
            top_p: 0.95,
            stream: false, // Désactiver le streaming pour récupérer une réponse complète
            stop: null
        });

        // Récupération et nettoyage de la réponse
        let responseText = chatCompletion.choices[0]?.message?.content || "Pas de réponse disponible.";
        responseText = responseText.replace(/<think>|<\/think>/g, "").trim(); // Suppression des balises <think>

        res.json({ response: responseText });

    } catch (error) {
        console.error("Erreur API Groq:", error);
        res.status(500).json({ error: "Erreur lors de la requête à Groq." });
    }
});

module.exports = router;
