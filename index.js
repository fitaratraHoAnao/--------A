const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const helloRoute = require('./api/hello');
const bienvenuRoute = require('./api/bienvenu');
const llamaRoute = require('./api/llama');
const deepseekRoute = require('./api/deepseek');

const PORT = process.env.PORT || 5000;

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Définir les routes API
app.use('/hello', helloRoute);
app.use('/bienvenu', bienvenuRoute);
app.use('/llama', llamaRoute); // Inclure la route Llama
app.use('/deepseek', deepseekRoute);
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
