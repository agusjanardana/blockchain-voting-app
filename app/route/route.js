const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../helpers/passport-configuration');

// inisialisasi handler lainnya disini  

const committeeHandler = require('../modules/committee/handler/api_handler');
const stakeHandler = require('../modules/stakeholder/handler/api_handler');
const adminHandler = require('../modules/administrator/handler/api_handler');
const voterHandler = require('../modules/voter/handler/api_handler');

// Stakeholder
router.get('/', stakeHandler.notLogin)
router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/stakeholder');
})

router.get('/success', adminHandler.isLoggedIn, adminHandler.showLogin)
router.get('/failed', adminHandler.notLogin)
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/success', stakeHandler.isLoggedIn, stakeHandler.showLogin)
router.get('/failed', stakeHandler.notLogin)
router.get('/login',
    router.get('/get/callback',
        passport.authenticate('google', { failureRedirect: '/failed' }),
        function (req, res) {
            // Successful authentication, redirect home.
            console.log(req.user._json.email)


            if (req.user._json.email == "rlzmtnck@student.telkomuniversity.ac.id") { // kondisi jika email role admin , maka akan redirect ke /admin/success
                res.redirect('/admin/success');

            } else {
                res.redirect('/stakeholder/success');
            }
        }));
// Voter
router.get('/voter/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/api/v1/voting');

})
router.get('/voter/login/success', voterHandler.isLoggedIn, voterHandler.showLogin)
router.get('/voter/login/failed', voterHandler.failedLogin)
router.get('/voter/login/callback',
    passport.authenticate('google', { failureRedirect: '/voter/login/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/api/v1/voting/voter/login/success');
    });

router.post("/voter/login",voterHandler.verifyLogin)
// router.get('/voter/login',
//     passport.authenticate('google', { scope: ['profile', 'email'] }));




// Committee
router.get('/committee/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/api/v1/voting');
    router.get('/committee/login/success', committeeHandler.isLoggedIn, committeeHandler.showLogin)
    router.get('/committee/login/failed', committeeHandler.failedLogin)
})
router.get('/committee/login/callback',
    passport.authenticate('google', { failureRedirect: '/committee/login/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/api/v1/voting/committee/login/success');
    });

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/voter/login',
    passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/committee/login',
    passport.authenticate('google', { scope: ['profile', 'email'] }));



// Admin

router.get('/admin', adminHandler.notLogin)
router.get('/admin/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/api/v1/voting/admin');
})
router.get('/admin/login/callback',
    passport.authenticate('google', { failureRedirect: '/admin/login/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/api/v1/voting/admin/login/success');
    });

router.get('/admin/login/success', adminHandler.isLoggedIn, adminHandler.showLogin)
router.get('/admin/login/failed', adminHandler.notLogin)
router.get('/admin/login/success', adminHandler.isLoggedIn, adminHandler.showLogin)
router.post('/admin/login', adminHandler.verifyLogin)
    //  passport.authenticate('google', { scope: ['profile', 'email'] }));


router.post('/committee/login', committeeHandler.verifyLogin)

router.post('/committee/register', committeeHandler.verifyRegister)

module.exports = router