// eslint-disable-next-line new-cap
const router = require('express').Router();
require('../../config/passport');
const passport = require('passport');
const {loginController} = require('../../controller/auth.controller');
const {loginMiddleware} = require('../../middleware/auth.middleware');


// Login Route
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
);
router.get(
    '/callback',
    loginMiddleware,
    loginController,
);

module.exports = router;
