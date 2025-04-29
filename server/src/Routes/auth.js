import express from 'express';
import passport from 'passport';
import User from '../models/user.js';

const router = express.Router();

// Register page
router.get('/register', (req, res) => {
    res.render('auth/register');
});

// Register logic
router.post('/register', async (req, res) => {
    try {
        const { username, password, name } = req.body;
        const user = new User({ username, name });
        await User.register(user, password);
        res.redirect('/login');
    } catch (err) {
        res.send(err.message);
    }
});

// Login page
router.get('/login', (req, res) => {
    res.render('auth/login');
});

// Login logic
router.post('/login', passport.authenticate('local', {
    successRedirect: '/subjects',
    failureRedirect: '/login'
}));

// Logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

export default router;
