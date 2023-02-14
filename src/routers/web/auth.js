import { Router } from 'express'

import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    res.redirect('/home');
})

authWebRouter.get('/login', (req, res) => {
    if (req.session?.nombre) {
        res.redirect('/home');
    } else {
        res.sendFile(path.join(__dirname, '../../', '../views/login.html'));
    }
})

authWebRouter.get('/logout', (req, res) => {
    res.render('./pages/logout', { nombre: req.session.nombre });
    req.session.destroy();
})


authWebRouter.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre;
    res.redirect('/home');
})



export default authWebRouter