const jwt = require('jsonwebtoken');
const { User } = require('./models');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        req.status(401).json({ message: 'Token tidak valid' });
    }
}

module.exports = authMiddleware;