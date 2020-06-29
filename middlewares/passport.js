import { Strategy as localStrategy } from 'passport-local';
import user from '../model/userSchema';
import { compare } from 'bcryptjs';

//Authentication Strategy
export default function(passport) {
    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        user.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User Doesn't Exists.." });
            }
            compare(password, data.password, (err, match) => {
                if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: "Password Doesn't Match" });
                }
                if (match) {
                    return done(null, data);
                }
            });
        });
    }));

    //End of Auth Strategy
    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function(id, cb) {
        user.findById(id, function(err, user) {
            cb(err, user);
        });
    });
}