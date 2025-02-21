const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const dateRoute = require('./api/date');
const bienvenuRoute = require('./api/bienvenu');
const llamaRoute = require('./api/llama');
const deepseekRoute = require('./api/deepseek');
const deepseekqwenRoute = require('./api/deepseek-qwen');
const llama11Route = require('./api/llama11');
const qwencoderRoute = require('./api/qwen-coder');
const geminiRoute = require('./api/gemini');
const conjugaisonRoute = require('./api/conjugaison');
const quizRoute = require('./api/quiz');
const translationRoute = require('./api/translation');
const baibolyRoute = require('./api/baiboly');
const tadiavinaRoute = require('./api/baiboly');
const fihiranaRoute = require('./api/fihirana');
const rechercheRoute = require('./api/synonyme');
const antonymRoute = require('./api/antonyme');
const photoRoute = require('./api/photo');
const gem29Route = require('./api/gemma');
const paroleRoute = require('./api/tononkira');
const mpanakantoRoute = require('./api/mpanakanto');


const PORT = process.env.PORT || 5000;

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Définir les routes API
app.use('/date', dateRoute);
app.use('/bienvenu', bienvenuRoute);
app.use('/llama', llamaRoute); // Inclure la route Llama
app.use('/deepseek', deepseekRoute);
app.use('/deepseek', deepseekqwenRoute);
app.use('/llama11', llama11Route);
app.use('/qwen-coder', qwencoderRoute);
app.use('/gemini', geminiRoute);
app.use('/conjugaison', conjugaisonRoute);
app.use('/quiz', quizRoute);
app.use('/translation', translationRoute);
app.use('/hira', fihiranaRoute);
app.use('/recherche', rechercheRoute);
app.use('/search', antonymRoute);
app.use('/api', photoRoute);
app.use('/gem29', gem29Route);
app.use('/parole', paroleRoute); // Ajoutez la logique pour la route baiboly
app.use('/mpanakanto', mpanakantoRoute); // Ajoutez la logique pour la route tadiavina


// Routes à ajouter si elles ne sont pas déjà définies dans vos fichiers de routes
app.use('/', baibolyRoute); // Ajoutez la logique pour la route baiboly
app.use('/', tadiavinaRoute); // Ajoutez la logique pour la route tadiavina

app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(middleware.route.path); // Affiche les chemins des routes
    }
});
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
