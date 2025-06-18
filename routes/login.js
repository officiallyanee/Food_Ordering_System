import express from 'express';
import {login, register } from '../controllers/auth.js';
import { passwordStrength } from 'check-password-strength';
import { authenticateAccessToken} from '../middlewares/auth.middleware.js';
const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    const token = req.cookies?.token;
    if(!token) return res.redirect('/login');
    else authenticateAccessToken(req, res, () => {});
    if(req.user.role=='customer') return res.redirect('/menu');
    if(req.user.role=='chef') return res.redirect('/chef');
    if(req.user.role=='admin') return res.redirect('/admin');
})

loginRouter.get('/login', (req, res) => {
    return res.render('login', {error:null});
})

loginRouter.post('/signin', (req, res) => {
    login(req, res);
})

loginRouter.post('/register', (req, res) => {
    register(req, res);
})

export default loginRouter