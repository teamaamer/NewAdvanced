import { verifyToken } from '../utils/tokenUtils.js';

const authMiddleware =(req, res,next) =>{
    try{
        const reqtoken = req.headers.authorization;
        console.log('reqtoken:', reqtoken);
        if (!reqtoken) {
            return res.status(401).json({ error: 'Unauthorized' });
          }

          verifyToken(reqtoken)
          .then((decoded) => {
            req.user = {
                id: decoded.id,
                type: decoded.type
            } 
            next();
          })
          .catch(() => {
            return res.status(401).json({ error: 'Unauthorized' });
          });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Authentication failed' });
      }
    };
    
    export default authMiddleware; 