const express = require('express');
const { authMiddleware, rbacMiddleware } = require('./middleware');
const router = express.Router();

router.get('/', authMiddleware, rbacMiddleware(['admin', 'user']), (req, res) => {
    res.json({ message: 'Route Middleware berfungsi!', user: req.user });
});

module.exports = router;