const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const router = express.Router();

// Fonction pour récupérer les livres
async function getBooks() {
    const url = "https://baiboly.katolika.org/";

    try {
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error("Impossible d'accéder au site");
        }

        const $ = cheerio.load(response.data);
        const bookElements = $(".row a");

        let books = [];
        bookElements.each((i, el) => {
            const bookText = $(el).text().trim();
            if (bookText && bookText !== "mamaky baiboly mitohy" && bookText !== "lisitry ny voatahiry") {
                books.push(bookText);
            }
        });

        return books;
    } catch (error) {
        throw new Error("Impossible d'accéder au site");
    }
}

// Fonction pour récupérer les chapitres d'un livre
async function getChapters(boky) {
    const url = `https://baiboly.katolika.org/boky/${boky}`;

    try {
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error("Impossible d'accéder au site");
        }

        const $ = cheerio.load(response.data);
        const title = $("h1").text().trim();

        if (!title) {
            throw new Error("Livre introuvable");
        }

        const chapters = [];
        $("div a").each((i, el) => {
            const chapter = $(el).text().trim();
            if (chapter) {
                chapters.push(chapter);
            }
        });

        if (chapters.length === 0) {
            throw new Error("Aucun chapitre trouvé");
        }

        // Supprimer les chapitres non désirés
        const unwantedChapters = ["Fitadiavana", "Boky rehetra", "Hamaky", "Fanazavana", "Hisoratra anarana", "Hiditra"];
        const filteredChapters = chapters.filter(chapter => !unwantedChapters.includes(chapter));

        // Ajouter des numéros au début de chaque chapitre
        const chaptersWithNumbers = filteredChapters.map((chapter, i) => `${i + 1}. ${chapter}`);

        return { title, chapters: chaptersWithNumbers };
    } catch (error) {
        throw new Error(error.message);
    }
}

// Route pour récupérer les livres
router.get('/baiboly', async (req, res) => {
    try {
        const books = await getBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour récupérer les chapitres d'un livre
router.get('/tadiavina', async (req, res) => {
    const boky = req.query.boky;

    if (!boky) {
        return res.status(400).json({ error: "Veuillez fournir un livre avec le paramètre 'boky'" });
    }

    try {
        const result = await getChapters(boky);
        res.json({ titre: result.title, chapitres: result.chapitres });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route 404
router.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée" });
});

module.exports = router;
