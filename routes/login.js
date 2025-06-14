import express from 'express';
import {login, register } from '../controllers/auth.js';

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    if(req.user.role=='customer') return res.redirect('/menu');
    if(req.user.role=='chef') return res.redirect('/chef');
    if(req.user.role=='admin') return res.redirect('/admin');
})

loginRouter.get('/login', (req, res) => {
    return res.render('login');
})

loginRouter.post('/signin', (req, res) => {
    login(req, res);
})

loginRouter.post('/register', (req, res) => {
    register(req, res);
})

export default loginRouter