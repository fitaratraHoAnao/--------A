const express = require("express");
const axios = require("axios");
const router = express.Router();
// Route pour créer une adresse e-mail temporaire
router.get("/generator", async (req, res) => {
    try {
        const { email } = req.query;

        if (!email || email !== "create") {
            return res.status(400).json({ error: "Le paramètre 'email' doit être égal à 'create'." });
        }

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

// Route pour récupérer les messages en utilisant l'email (via le token associé)
router.get("/inbox", async (req, res) => {
    try {
        const { mail } = req.query;

        if (!mail) {
            return res.status(400).json({ error: "Le paramètre 'mail' est requis." });
        }

        // Obtenir la liste des boîtes pour retrouver le token associé à l'email
        const listResponse = await axios.get("https://api.tempmail.lol/v2/inbox/list");
        const inbox = listResponse.data.find(item => item.email === mail);

        if (!inbox) {
            return res.status(404).json({ error: "Adresse e-mail non trouvée." });
        }

        const token = inbox.token;

        // Récupération des messages via le token
        const messageResponse = await axios.get(`https://api.tempmail.lol/v2/inbox?token=${token}`);
        res.json({ Messages: messageResponse.data });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Erreur lors de la récupération des messages." });
    }
});
router.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée" });
});

module.exports = router;
