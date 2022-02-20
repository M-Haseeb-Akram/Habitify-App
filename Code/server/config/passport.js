const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/users_model');

passport.serializeUser((user, done) => {
    done(null, user);
});


passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/callback',
        passReqToCallback: true,
    }, (request, accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}, async (err, user) => {
            if (err) {
                return done(err, null);
            }
            if (user) {
                return done(null, user);
            } else {
                await new User({
                    googleId: profile.id,
                    Name: profile.displayName,
                    email: profile.emails[0].value,
                    picture: profile.picture,
                }).save((error, newUser) => {
                    if (!error) {
                        return done(null, newUser);
                    }
                    return done(error, null);
                });
            }
        });
    }),
);

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('JWT');
options.secretOrKey = process.env.PORT;
passport.use(
    'jwt',
    new JwtStrategy(options, (token, done) => {
        User.findOne({_id: token.id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }),
);


passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


