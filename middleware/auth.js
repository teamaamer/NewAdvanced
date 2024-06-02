import { verifyToken } from '../utils/tokenUtils.js';

const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization; // Gets the full authorization header

        if (!header) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const parts = header.split(' '); // Splits the header into parts
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ error: 'Unauthorized: Token format is invalid' });
        }

        let token = parts[1];

        verifyToken(token)
            .then((decoded) => {
                req.user = {
                    id: decoded.id,
                    type: decoded.type
                };
                next();
            })
            .catch(() => {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            });
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
};

export default authMiddleware;
