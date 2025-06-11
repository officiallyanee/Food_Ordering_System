import express from 'express';
import {login, register } from '../controllers/auth.js';

const loginRouter = express.Router();

loginRouter.get('/login', (req, res) => {
    res.render('login');
})

loginRouter.post('/signin', (req, res) => {
    login(req, res);
})

loginRouter.post('/register', (req, res) => {
    register(req, res);
})

export default loginRouter