import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export function authenticateAccessToken(req, res, next) {
    const token = req.cookies?.token;
    if (token == null) return res.redirect('/login');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){
            return res.sendStatus(403);
        };
        req.user = user;
        next();
    });
}

export function restrictTo(roles=[]) {
    return (req, res, next) => {
        if(!req.user) return res.redirect('/login');
        if (!roles.includes(req.user.role)) {
            return res.sendStatus(403);
        }
        next();
    }
}


