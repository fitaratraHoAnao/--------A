const express = require("express");
const axios = require("axios");
const router = express.Router();

// Route pour récupérer les messages via l'email
router.get("/", async (req, res) => {
    try {
        const { mail } = req.query;

        if (!mail) {
            return res.status(400).json({ error: "Le paramètre 'mail' est requis." });
        }

        // Récupération de la liste pour retrouver le token associé à l'email
        const listResponse = await axios.get("https://api.tempmail.lol/v2/inbox/list");
        const inbox = listResponse.data.find(item => item.email === mail);

        if (!inbox) {
            return res.status(404).json({ error: "Adresse e-mail non trouvée." });
        }

        const token = inbox.token;

        // Appel pour récupérer les messages en utilisant le token
        const messageResponse = await axios.get(`https://api.tempmail.lol/v2/inbox?token=${token}`);
        res.json({ Messages: messageResponse.data });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Erreur lors de la récupération des messages." });
    }
});

// Exportation des routes
module.exports = router;
