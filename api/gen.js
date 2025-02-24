const dotenv = require('dotenv');
dotenv.config();

module.exports = (tempMail) => {
    const router = require('express').Router();
    const axios = require('axios');

    router.get('/', async (req, res) => {
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

    return router;
};
