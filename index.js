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
const fihiranaRoute = require('./api/fihirana');
const rechercheRoute = require('./api/synonyme');
const antonymRoute = require('./api/antonyme');
const photoRoute = require('./api/photo');
const gem29Route = require('./api/gemma');
const mpanakantoRoute = require('./api/mpanakanto');
const paroleRoute = require('./api/tononkira');
const genRoutes = require('./gen');
const inboxRoutes = require('./boite');

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/date', dateRoute);
app.use('/bienvenu', bienvenuRoute);
app.use('/llama', llamaRoute);
app.use('/deepseek', deepseekRoute);
app.use('/deepseek-qwen', deepseekqwenRoute);
app.use('/llama11', llama11Route);
app.use('/qwen-coder', qwencoderRoute);
app.use('/gemini', geminiRoute);
app.use('/conjugaison', conjugaisonRoute);
app.use('/quiz', quizRoute);
app.use('/translation', translationRoute);
app.use('/hira', fihiranaRoute);
app.use('/recherche', rechercheRoute);
app.use('/antonyme', antonymRoute);
app.use('/photo', photoRoute);
app.use('/gem29', gem29Route);
app.use('/mpanakanto', mpanakantoRoute);
app.use('/parole', paroleRoute);
app.use('/baiboly', baibolyRoute);
app.use('/create', genRoutes);
app.use('/inbox', inboxRoutes);

app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(middleware.route.path);
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
