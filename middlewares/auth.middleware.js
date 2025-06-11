import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export function authenticateAccessToken(req, res, next) {
    const access_token = req.cookies.access_token;
    if (access_token == null) return res.sendStatus(401);

    jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            authenticateRefreshToken(req, res);
            next();
        };
        req.user = user;
        next();
    });
}

async function authenticateRefreshToken(req, res) {
    const refresh_token = req.cookies.refresh_token;
    if(refresh_token == null) return res.sendStatus(401).redirect('/login');
    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const access_token = jwt.sign({id: user.user_id,name:user.name, role:user.role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
        req.user = user;
        res.cookie('access_token', access_token, { httpOnly: true, sameSite: 'strict' , maxAge: 900000 }) 
           .sendStatus(201)
           .redirect('/menu');
    });
}

