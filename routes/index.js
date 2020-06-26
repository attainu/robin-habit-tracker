import { Router } from "express";
var router = Router();
import auth from "../middlewares/auth";
var { getUser } = require('../controller/userController').default;

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("home", { title: "Habit-Tracker" });
});

//Get SignUp page
router.get("/register", function(req, res, next) {
    res.render("register", { title: "SignUp" });
});

//Get login Page
router.get("/login", function(req, res, next) {
    res.render("login", { title: "login", success_message: "User Logged Out", failure_message: "Login Failed" });
});

//Get User Dashboard
router.get("/dashboard", auth, getUser);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});

export default router;