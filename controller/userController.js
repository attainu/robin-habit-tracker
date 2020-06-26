import User from "../model/userSchema";
import bcrypt from "bcryptjs";
import passport from "passport";

var userController = {};

userController.register = async(req, res, next) => {
    var { email, name, password, confirmpassword, contactNo } = req.body;
    var err;
    if (!email || !name || !password || !confirmpassword) {
        err = "Please Fill All The Fields...";
        res.render('register', { err: err, title: "SignUp" });
    }
    if (password != confirmpassword) {
        err = "Passwords Don't Match";
        res.render('register', { 'err': err, 'email': email, 'name': name, title: "SignUp" });
    }
    if (typeof err == 'undefined') {
        User.findOne({ email: email }, function(err, data) {
            if (err) throw err;
            if (data) {
                console.log("User Exists");
                err = "User Already Exists With This Email...";
                res.render('register', { err: err, email: email, title: "SignUp" });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        User({
                            email,
                            name,
                            password,
                            contactNo
                        }).save((err, data) => {
                            if (err) throw err;
                            req.flash('success_message', "Registered Successfully.. Login To Continue..");
                            res.redirect('/login');
                        });
                    });
                });
            }
        });
    }
};

userController.login = async(req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/dashboard',
        failureFlash: true,
    })(req, res, next);
};

userController.getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.render('dashboard', {
            message: `Hello ${user.name}, this is your dashboard`,
            title: "User Dashboard",
            userId: user._id
        })
    } catch (e) {
        res.send({ message: `${e}`, text: "Error in Fetching user" });
    }
}
export default userController;