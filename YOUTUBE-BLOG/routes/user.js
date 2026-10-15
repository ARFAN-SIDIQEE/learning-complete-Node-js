
const { Router } = require('express');
const User = require('../models/user');

const router = Router();

// Signin page
router.get('/signin', (req, res) => {
    return res.render('signin');
});

// Signup page
router.get('/signup', (req, res) => {
    return res.render('signup');
});

// Signin user
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await User.matchPasswordAndGenerateToken(
            email,
            password
        );

        return res.cookie('token', token).redirect('/');
    } catch (error) {
        console.error(error.message);

        return res.status(401).render('signin', {
            error: 'Incorrect email or password'
        });
    }
});

// Logout user
router.get('/logout', (req, res) => {
    return res.clearCookie('token').redirect('/');
});

// Signup user
router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        await User.create({
            fullName,
            email,
            password
        });

        return res.redirect('/user/signin');
    } catch (error) {
        console.error(error);
        return res.status(400).send('Failed to create account');
    }
});

module.exports = router;
