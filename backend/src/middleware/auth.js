const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config');

function requireAuth(req, res, next) {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing Token'});
    }
    const token = header.slice(7);

    try {
        const payload = jwt.verify(token, jwtSecret);
        if (payload.role !== 'branch_manager') {
            return res.status(403).json({ message: 'Forbidden'});
        }
        req.user = payload;
        next()
    } catch {
        return res.status(401).json({message: 'Invalid Token' });
    }
}

module.exports = {requireAuth};