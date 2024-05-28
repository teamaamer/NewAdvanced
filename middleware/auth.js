import { verifyToken } from '../utils/tokenUtils.js';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;  // Directly using the token from the Authorization header
        console.log('Token:', token);

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

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
