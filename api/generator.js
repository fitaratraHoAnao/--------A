const express = require('express');
const axios = require('axios');


router.get('/generator', async (req, res) => {
    const { mail } = req.query;

    if (mail !== 'create') {
        return res.status(400).json({ error: "Le paramètre 'mail' doit être égal à 'create'." });
    }

    try {
        const response = await axios.get('https://api.tempmail.lol/v2/inbox/create');
        const data = response.data;

        res.json({
            address: data.address,
            token: data.token
        });
    } catch (error) {
        console.error('Erreur lors de la requête à l\'API TempMail :', error.message);
        res.status(500).json({ error: 'Impossible de créer une adresse e-mail temporaire.' });
    }
});

