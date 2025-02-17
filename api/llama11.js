const express = require('express');
const Groq = require('groq-sdk');
require('dotenv').config();

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.get('/', async (req, res) => {
    try {
        const question = req.query.question || "Bonjour";
        
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "Bonjour" },
                { role: "user", content: question }
            ],
            model: "llama-3.2-11b-vision-preview",
            temperature: 1,
            max_completion_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null
        });
        
        const responseText = chatCompletion.choices[0]?.message?.content || "Pas de réponse disponible.";
        
        res.json({ response: responseText });
    } catch (error) {
        console.error("Erreur API Groq:", error);
        res.status(500).json({ error: "Erreur lors de la requête à Groq." });
    }
});

module.exports = router;
