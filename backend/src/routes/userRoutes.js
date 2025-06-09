const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User authentication routes berfungsi!');
});

module.exports = router;