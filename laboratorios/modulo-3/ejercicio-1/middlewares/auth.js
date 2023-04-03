const jwt = require('jsonwebtoken');

function validateToken(token) {
    try {
        return jwt.verify(token, 'xyz');
    } catch (error) {
        return null;
    }
}

function ensureAuthenticated(req, res, next) {
    if (req.path === '/login') {
        return next();
    }

    const token = req.session?.token;

    if (!token) {
        return res.redirect('/login');
    }

    const decoded = validateToken(token);

    if (!decoded) {
        return res.redirect('/login');
    }

    req.user = decoded;
    next();
}

module.exports = {
    ensureAuthenticated
}
