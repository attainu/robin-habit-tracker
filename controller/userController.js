import User from "../model/userSchema";
import bcrypt from "bcryptjs";
import passport from "passport";
import transporter from "../helper/nodemailer";

var userController = {};

//Register Controller
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

                        //Send Confirmation mail
                        const url = `http://localhost:8080/dashboard`;
                        const mailOption = {
                            from: 'coolkaran.singh4frndz@gmail.com',
                            to: req.body.email,
                            subject: 'Please verify your email',
                            text: "your account has been created on Habit-Tracker",
                            html: `hi "${req.body.email}" Please click link to confirm your email: <a href="${url}">${url}</a>`
                        }

                        User({
                            email,
                            name,
                            password,
                            contactNo
                        }).save((err, data) => {
                            transporter.sendMail(mailOption, (err, info) => {
                                if (err) throw err;
                                req.flash('success_message', "Registered Successfully.. Verify Email..");
                                res.redirect('/login');
                            })
                        });
                    });
                });
            }
        });
    }
};

//Login Controller
userController.login = async(req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/dashboard',
        failureFlash: true,
    })(req, res, next);
};

//Get Dashboard after successfull Authentication
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