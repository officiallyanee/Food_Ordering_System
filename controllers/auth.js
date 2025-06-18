import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {getUserDetails, postRefreshToken, postUserDetails } from './authQueries.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        if(password.length<8) res.render('login', {err:"Password length needs to be atleast 8"})
        const user_id = uuidv4();
        const salt = generateSalt(8);
        const salted_pwd= password + salt;
        const pwd_hash = await bcrypt.hash(salted_pwd, 10);
        const role = "customer";
        const pwd_store= salt+pwd_hash;
        const user = {user_id, name, email,pwd_store,role};
        const token = generateToken(user);
        console.log("INSERT INTO login_details (`user_id`,`name`, `email`, `pwd_hash`, `role`) VALUES "+ `('${user.user_id}', '${user.name}', '${user.email}', '${user.pwd_store}', '${user.role}')`);
        await postUserDetails(user);
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict' })  
           .status(201)
           .redirect('/');
    } catch (error) {
        res.status(400)
           .render('login', {error:"User already exists"});
    }
}

export async function login(req, res) {
    try {
        const { name, password } = req.body;

        const user = await getUserDetails(name);
        if (!user ) {
            return res.status(400).redirect('/login');
        }
        const salt = user.pwd_hash.slice(0,8);
        const salted_hash = user.pwd_hash.slice(8);
        const salted_pwd = password + salt;
        const isMatch = await bcrypt.compare(salted_pwd, salted_hash);

        if (isMatch) {
            const token = generateToken(user);
            return res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'strict'
                })
                .status(201)
                .redirect('/');
        } else {
            return res.status(400).render('login', {error:"Incorrect credentials"});
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).redirect('/login');  
    }
}

function generateSalt(length){
    let result = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    while(result.length < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateToken(user) {
    const user_token_info = {id:user.user_id,name:user.name, role:user.role};
    const token = jwt.sign(user_token_info, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2d' });
    return token;
}