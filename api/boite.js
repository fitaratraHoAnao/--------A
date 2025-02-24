const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const { tempMail } = require('./gen'); // Importation des emails stockés depuis gen.js

const router = express.Router();

// Route pour vérifier la boîte mail avec l'adresse et le token
router.get('/', async (req, res) => {
    const { mail } = req.query;

    if (!mail || mail !== tempMail.address) {
        return res.status(400).json({ error: 'Adresse email invalide ou inexistante.' });
    }

    try {
        const response = await axios.get(`https://api.tempmail.lol/v2/inbox?token=${tempMail.token}`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
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

module.exports = router;
