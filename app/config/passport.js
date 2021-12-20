const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // Login:
        // Checking if user is present in the database:
        const user = await User.findOne({ email: email });
        // If user is not Present:
        if (!user) {
            return done(null, false, { message: 'Email is not registered!!!' });
        }
        // Checking for Password:
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                return done(null, user, { message: 'Loged in successfully!!!' });
            }
            // Password do not Match:
            return done(null, false, { message: 'Please enter correct password!!!' });
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong!!!' });
        });
    }))
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })
}

module.exports = init;