const express = require('express');
const router = express.Router();

router.get('/bienvenue', (req, res) => {
    const question = req.query.question || "Bienvenue";
    res.json({ response: "Bienvenue sur notre API !" });
});

module.exports = router;
