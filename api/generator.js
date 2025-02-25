const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();

// Stockage temporaire des mails et tokens
let tempMail = {};

// Route pour générer un email temporaire
router.get('/', async (req, res) => {
    const { mail } = req.query;

    if (mail !== 'create') {
        return res.status(400).json({ error: "Le paramètre 'mail' doit être égal à 'create'." });
    }

    try {
        const response = await axios.get('https://api.tempmail.lol/v2/inbox/create');
        const data = response.data;

        // Stocker l'email et son token
        tempMail[data.address] = data.token;

        res.json({
            address: data.address,
            token: data.token
        });
    } catch (error) {
        console.error("Erreur lors de la requête à l'API TempMail :", error.message);
        res.status(500).json({ error: "Impossible de créer une adresse e-mail temporaire." });
    }
});

// Route pour récupérer les emails d'une adresse générée (changement de "mail" en "message")
router.get('/', async (req, res) => {
    const { message } = req.query; // Utilisation de "message" au lieu de "mail"

    if (!message) {
        return res.status(400).json({ error: "Le paramètre 'message' est requis." });
    }

    const token = tempMail[message]; // Récupération du token associé à l'email
    if (!token) {
        return res.status(404).json({ error: "Adresse e-mail non trouvée ou expirée." });
    }

    try {
        const response = await axios.get(`https://api.tempmail.lol/v2/inbox?token=${token}`);
        res.json(response.data);
    } catch (error) {
        console.error("Erreur lors de la récupération des emails :", error.message);
        res.status(500).json({ error: "Impossible de récupérer les emails." });
    }
});

// Route 404 pour les chemins inconnus
router.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée" });
});

module.exports = router;
