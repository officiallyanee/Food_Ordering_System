import express from 'express';
import fs from 'fs';
import engine from 'ejs-mate';
import menuRouter from './routes/menu.js';
import loginRouter from './routes/login.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { authenticateAccessToken } from './middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8080;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.engine('ejs', engine);

app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs'); 
app.use(express.static(path.join(__dirname, '/public/')));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    fs.appendFile('log.txt', `${req.method} ${req.url} ${Date.now()}\n`, (err) => {
        if (err) {
            console.error(err);
        }
        next();
    })
});


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/', loginRouter);
app.use((req, res, next) => authenticateAccessToken(req, res, next));
app.use('/menu', menuRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

