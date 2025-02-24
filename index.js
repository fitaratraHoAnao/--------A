const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Importation des routes API
const routes = {
    date: require('./api/date'),
    bienvenu: require('./api/bienvenu'),
    llama: require('./api/llama'),
    deepseek: require('./api/deepseek'),
    deepseekqwen: require('./api/deepseek-qwen'),
    llama11: require('./api/llama11'),
    qwenCoder: require('./api/qwen-coder'),
    gemini: require('./api/gemini'),
    conjugaison: require('./api/conjugaison'),
    quiz: require('./api/quiz'),
    translation: require('./api/translation'),
    baiboly: require('./api/baiboly'),
    fihirana: require('./api/fihirana'),
    synonyme: require('./api/synonyme'),
    antonyme: require('./api/antonyme'),
    photo: require('./api/photo'),
    gem29: require('./api/gemma'),
    mpanakanto: require('./api/mpanakanto'),
    parole: require('./api/tononkira'),
    tempmail: require('./api/tempmail')  // ✅ Un seul import pour create et inbox
};

// Définition des routes API
app.use('/date', routes.date);
app.use('/bienvenu', routes.bienvenu);
app.use('/llama', routes.llama);
app.use('/deepseek', routes.deepseek);
app.use('/deepseek-qwen', routes.deepseekqwen);
app.use('/llama11', routes.llama11);
app.use('/qwen-coder', routes.qwenCoder);
app.use('/gemini', routes.gemini);
app.use('/conjugaison', routes.conjugaison);
app.use('/quiz', routes.quiz);
app.use('/translation', routes.translation);
app.use('/baiboly', routes.baiboly);
app.use('/fihirana', routes.fihirana);
app.use('/synonyme', routes.synonyme);
app.use('/antonyme', routes.antonyme);
app.use('/api/photo', routes.photo);
app.use('/gem29', routes.gem29);
app.use('/mpanakanto', routes.mpanakanto);
app.use('/parole', routes.parole);
app.use('/api/create', routes.tempmail);
app.use('/api/inbox', routes.tempmail);  // ✅ Route unifiée

// Affichage des routes disponibles pour debug
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(`Route chargée : ${middleware.route.path}`);
    }
});

// Exporter l'application pour Vercel
module.exports = app;
