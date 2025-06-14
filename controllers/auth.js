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
        const token = generateToken(user);
        await postUserDetails(user);
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict' })  
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
        console.log(user);
        if (!user ) {
            return res.status(400).redirect('/login');
        }

        const isMatch = await bcrypt.compare(password, user.pwd_hash);
        console.log("Is Match: " + isMatch);

        if (isMatch) {
            const token = generateToken(user);
            return res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'strict'
                })
                .status(201)
                .redirect('/menu');
        } else {
            return res.status(400).redirect('/login');
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).redirect('/login');  
    }
}


function generateToken(user) {
    const user_token_info = {id:user.user_id,name:user.name, role:user.role};
    const token = jwt.sign(user_token_info, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2d' });
    return token;
}