const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config(); // Charger les variables d'environnement à partir du fichier .env

const router = express.Router();

// Route pour créer une adresse email temporaire
router.get('/generate', async (req, res) => {
    try {
        const response = await axios.post('https://api.tempmail.lol/v2/inbox/create', {}, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}` // Utilisation de la clé API dans les en-têtes
            }
        });
        const { address, token } = response.data;

        // Stocker l'email et le token
        tempMail = { address, token };

        res.json({
            message: "Adresse email temporaire créée avec succès.",
            email: address,
            token: token
        });

    } catch (error) {
        console.error('Erreur lors de la création de l’email temporaire :', error.response?.data || error.message);
        res.status(500).json({ error: 'Impossible de créer l’email temporaire.' });
    }
});

// Route pour vérifier la boîte mail avec l'adresse et le token
router.get('/message', async (req, res) => {
    const { mail } = req.query;

    if (!mail || mail !== tempMail.address) {
        return res.status(400).json({ error: 'Adresse email invalide ou inexistante.' });
    }

    try {
        const response = await axios.get(`https://api.tempmail.lol/v2/inbox?token=${tempMail.token}`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}` // Utilisation de la clé API dans les en-têtes
            }
        });
        const { emails, expired } = response.data;

        res.json({
            email: tempMail.address,
            expired: expired,
            emails: emails.length > 0 ? emails : "Aucun email reçu pour l'instant."
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des emails :', error.response?.data || error.message);
        res.status(500).json({ error: 'Impossible de récupérer les emails.' });
    }
});

// Route 404
router.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée" });
});

module.exports = router;
