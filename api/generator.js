const express = require("express");
const axios = require("axios");
const router = express.Router();

// Route pour créer une adresse e-mail temporaire
router.get("/", async (req, res) => {
    try {
        const { email } = req.query;

        if (!email || email !== "create") {
            return res.status(400).json({ error: "Le paramètre 'email' doit être égal à 'create'." });
        }

        // Appel à l'API pour créer un e-mail temporaire
        const response = await axios.get("https://api.tempmail.lol/v2/inbox/create");
        const { email: generatedEmail, token } = response.data;

        res.json({
            Email: generatedEmail,
            Token: token
        });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Erreur lors de la création de l'adresse e-mail." });
    }
});

// Exportation des routes
module.exports = router;
