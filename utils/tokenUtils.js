import jwt from 'jsonwebtoken';

const generateToken =(userId, userType) => {
    return jwt.sign({id: userId, type: userType},process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    };

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY,(err,decoded) => {
        if (err){
            reject(err);
        }
        else{
            resolve(decoded);
        }
        });
    });
};    

export {generateToken, verifyToken};