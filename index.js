const express = require('express');
const app = express();
const path = require('path');

const helloRoute = require('./api/hello');
const bienvenuRoute = require('./api/bienvenu');

const PORT = process.env.PORT || 5000;

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Définir les routes API
app.use('/hello', helloRoute);
app.use('/bienvenu', bienvenuRoute);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
