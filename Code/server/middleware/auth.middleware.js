const passport = require('passport');
require('../config/passport');

const loginMiddleware = (req, res, next) => {
    passport.authenticate('google', {scope:
            ['email', 'profile']}, (err, user, info) => {
        if (err || !user) {
            res.status(401).json({
                message: 'Error in Google Auth',
                statusCode: 400,
            });
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};

const authenticateAction = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err || !user) {
            res.status(401).json({
                message: info.message,
                error: err,
                statusCode: 400,
            });
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
};

module.exports = {loginMiddleware, authenticateAction};
