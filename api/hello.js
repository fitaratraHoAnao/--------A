const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const question = req.query.question || "Hello";
    res.json({ response: "Hello World" });
});

module.exports = router;
