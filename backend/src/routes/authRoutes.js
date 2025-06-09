const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.send('Auth routes berfungsi!');
});

module.exports = router;