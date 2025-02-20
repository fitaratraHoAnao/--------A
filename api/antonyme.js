const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');


app.get('/', async (req, res) => {
    const mot = req.query.antonym;

    if (!mot) {
        return res.status(400).json({ error: 'Veuillez fournir un mot en paramètre.' });
    }

    try {
        const url = `https://www.antonyme.org/antonyme/${encodeURIComponent(mot)}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const titre = $('h1').text().trim();
        const antonymes = [];

        // Cibler spécifiquement la liste des antonymes principaux
        $('h1 + ul.synos > li > a.word').each((index, element) => {
            antonymes.push($(element).text().trim());
        });

        if (antonymes.length === 0) {
            return res.status(404).json({ error: `Aucun antonyme trouvé pour le mot "${mot}".` });
        }

        res.json({
            titre,
            antonymes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des antonymes.' });
    }
});

