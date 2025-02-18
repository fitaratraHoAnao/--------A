const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const helloRoute = require('./api/hello');
const bienvenuRoute = require('./api/bienvenu');
const llamaRoute = require('./api/llama');
const deepseekRoute = require('./api/deepseek');
const deepseekqwenRoute = require('./api/deepseek-qwen');
const llama11Route = require('./api/llama11');
const qwencoderRoute = require('./api/qwen-coder');
const geminiRoute = require('./api/gemini');
const conjugaisonRoute = require('./api/conjugaison');
const quizRoute = require('./api/quiz');

const PORT = process.env.PORT || 5000;

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Définir les routes API
app.use('/hello', helloRoute);
app.use('/bienvenu', bienvenuRoute);
app.use('/llama', llamaRoute); // Inclure la route Llama
app.use('/deepseek', deepseekRoute);
app.use('/deepseek', deepseekqwenRoute);
app.use('/llama11', llama11Route);
app.use('/qwen-coder', qwencoderRoute);
app.use('/gemini', geminiRoute);
app.use('/conjugaison', conjugaisonRoute);
app.use('/quiz', quizRoute);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
