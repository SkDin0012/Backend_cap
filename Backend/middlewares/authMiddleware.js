
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log('Token:', token); 

        if (!token) {
            return res.status(401).json({ message: 'Authentication token required' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded:', decoded); 
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }

            req.user = user; 
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
};

module.exports = authMiddleware;
