const express = require('express');
const Groq = require('groq-sdk');
require('dotenv').config();

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.get('/deepseek', async (req, res) => {
    try {
        const question = req.query.question || "Bonjour, comment ça va ?";
        
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "user", content: question }
            ],
            model: "deepseek-r1-distill-llama-70b",
            temperature: 0.6,
            max_completion_tokens: 4096,
            top_p: 0.95,
            stream: false
        });

        const responseText = chatCompletion.choices[0]?.message?.content || "Pas de réponse disponible.";
        
        res.json({ response: responseText });

    } catch (error) {
        console.error("Erreur API Groq:", error);
        res.status(500).json({ error: "Erreur lors de la requête à Groq." });
    }
});

module.exports = router;
