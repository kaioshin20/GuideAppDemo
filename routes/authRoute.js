const express = require('express');
const session=require('express-session');
const passport=require('../stratergies');
const router = express.Router();
const {connectdb}=require('../database/db');


router.use(session({
    secret: 'omaeowa mo shindeiru',
    resave: false,
    saveUninitialized: true,
}))
router.use(passport.initialize())
router.use(passport.session())


router.get('/signup', (req, res) => {
    res.render("signup")
})

router.post('/signup', (req, res) => {
    let nuser = {
        email: req.body.email,
        password: req.body.password
    }
    connectdb('guideApp_demo')
        .then(db => db.collection('users').insertOne(nuser))
        .then(() => res.redirect('/'))
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

router.get('/signin', (req, res) => {
    res.render("signin")
})

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin'
}))

router.get("/signin/facebook", passport.authenticate('facebook', { scope : ['email'] }))

router.get('/signin/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/signin/facebook'
}))

router.get('/signin/google', passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/signin/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/signin/google'
}))


module.exports = router;