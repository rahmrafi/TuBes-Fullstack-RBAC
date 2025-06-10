const rbacMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user.roles.map(role => role.name);
        const hasAccess = requiredRole.some(role => userRole.includes(role));

        if (!hasAccess) {
            return res.status(403).json({ message: 'Akses ditolak' });
        }

        next();
    };
};

module.exports = rbacMiddleware;