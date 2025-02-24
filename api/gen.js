const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

let tempMail = {}; // Stocke l'email et le token

// Route pour créer une adresse email temporaire
router.get('/', async (req, res) => {
    try {
        const response = await axios.post('https://api.tempmail.lol/v2/inbox/create', {}, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });

        const { address, token } = response.data;
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

module.exports = router;
