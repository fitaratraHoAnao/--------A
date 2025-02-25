const express = require("express");
const Replicate = require("replicate");
require("dotenv").config();

const router = express.Router();

// Initialisation de Replicate avec la clé API
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

// Route GET /llamanew?question=...
router.get("/", async (req, res) => {
    const question = req.query.question;

    if (!question) {
        return res.status(400).json({ error: "Veuillez fournir un paramètre 'question'." });
    }

    const input = {
        top_p: 1,
        prompt: question,
        temperature: 0.75,
        max_new_tokens: 800
    };

    try {
        let responseText = "";

        for await (const event of replicate.stream("meta/llama-2-7b-chat", { input })) {
            responseText += event;
        }

        res.json({ question, response: responseText });
    } catch (error) {
        console.error("Erreur lors de la génération avec LLaMA :", error.message);
        res.status(500).json({ error: "Une erreur est survenue lors de la génération de la réponse." });
    }
});

module.exports = router;
