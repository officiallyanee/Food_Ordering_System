import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {getUserDetails, postRefreshToken, postUserDetails } from './authQueries.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function register(req, res) {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const user_id = uuidv4();
        const salt =bcrypt.genSaltSync(10);
        const pwd_hash = await bcrypt.hash(password, salt);
        const role = "customer";
        const user = {user_id, name, email, pwd_hash ,role};
        console.log(user);
        console.log(generateTokens(user));
        const { access_token, refresh_token } = generateTokens(user);
        console.log("generated tokens");
        await postUserDetails(user);
        console.log("posted user info");
        await postRefreshToken(user_id,refresh_token);
        console.log("posted refresh token");
        res.cookie('access_token', access_token, { httpOnly: true, sameSite: 'strict' })  
           .cookie('refresh_token', refresh_token, { httpOnly: true, sameSite: 'strict'})
           .status(201)
           .redirect('/menu');
    } catch (error) {
        res.status(400)
           .redirect('/login');
    }
}

export async function login(req, res) {
    try {
        const { name, password } = req.body;
        const user = await getUserDetails(name);
        const isMatch = await bcrypt.compare(password, user.pwd_hash);
        if (isMatch) {
            const { access_token, refresh_token } = generateTokens(user);
            await postRefreshToken(user.user_id,refresh_token);
            res.cookie('access_token', access_token, { httpOnly: true, sameSite: 'none' ,maxAge: 900000})
               .cookie('refresh_token', refresh_token, { httpOnly: true, sameSite: 'none' , maxAge: 900000})
               .status(201)
               .redirect('/menu');
        } else {
            res.status(400).redirect('/login');
        }
    } catch (error) {
        res.status(400).redirect('/login');
    }    
}

function generateTokens(user) {
    const user_token_info = {id:user.user_id,name:user.name, role:user.role};
    const access_token = jwt.sign(user_token_info, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    const refresh_token = jwt.sign(user_token_info, process.env.REFRESH_TOKEN_SECRET);
    console.log(access_token, refresh_token);
    return { access_token: access_token, refresh_token: refresh_token }
}