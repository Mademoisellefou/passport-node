
import { Router } from "express";
const router = Router();
import {checkAuthenticated,checkNotAuthenticated} from '../helpers/index.js'
import  bcrypt from  'bcrypt'
import  passport from  'passport'
import  pool from  '../database.js'

router.get('/', checkAuthenticated, (req, res) => {
    console.log(req.user);
    res.render('index.ejs', { name: req.user.name })
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(
            req.body.password, 10
        )
        const newUser = {
            // id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }
        await pool.query('INSERT INTO tbuser set ?', [newUser]);
        
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})
router.delete('/logout', checkNotAuthenticated, (req, res) => {
    req.logOut(),
        res.redirect('/login')
})

export default router;