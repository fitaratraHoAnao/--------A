const express = require('express');
const axios = require('axios');
require('dotenv').config();

module.exports = (tempMail) => {
    const router = express.Router();

    // Route pour créer une adresse email temporaire (ancien gen.js)
    router.get('/create', async (req, res) => {
        try {
            const response = await axios.post('https://api.tempmail.lol/v2/inbox/create', {}, {
                headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
            });

            tempMail.address = response.data.address;
            tempMail.token = response.data.token;

            res.json({
                message: "Adresse email temporaire créée avec succès.",
                email: tempMail.address,
                token: tempMail.token
            });

        } catch (error) {
            console.error('Erreur lors de la création de l’email temporaire :', error.message);
            res.status(500).json({ error: 'Impossible de créer l’email temporaire.' });
        }
    });

    // Route pour consulter la boîte de réception (ancien boite.js)
    router.get('/inbox', async (req, res) => {
        const { mail } = req.query;

        if (!mail || mail !== tempMail.address) {
            return res.status(400).json({ error: 'Adresse email invalide ou inexistante.' });
        }

        try {
            const response = await axios.get(`https://api.tempmail.lol/v2/inbox?token=${tempMail.token}`, {
                headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
            });

            res.json({
                email: tempMail.address,
                expired: response.data.expired,
                emails: response.data.emails.length > 0 ? response.data.emails : "Aucun email reçu pour l'instant."
            });

        } catch (error) {
            console.error('Erreur lors de la récupération des emails :', error.message);
            res.status(500).json({ error: 'Impossible de récupérer les emails.' });
        }
    });

    // Route 404 pour les chemins inexistants
    router.use((req, res) => {
        res.status(404).json({ error: "Route non trouvée" });
    });

    return router;
};
