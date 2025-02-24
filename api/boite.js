const dotenv = require('dotenv');
dotenv.config();

module.exports = (tempMail) => {
    const router = require('express').Router();
    const axios = require('axios');

    router.get('/', async (req, res) => {
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

    return router;
};
