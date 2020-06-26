var express = require("express");
var router = express.Router();
var auth = require("../middlewares/auth");
var userController = require("../controller/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home", { title: "Habit-Tracker" });
});

//Get SignUp page
router.get("/register", function (req, res, next) {
  res.render("register", { title: "SignUp" });
});

//Get login Page
router.get("/login", function (req, res, next) {
  res.render("login", { title: "login" });
});

//Get User Dashboard
router.get("/dashboard", auth, userController.getUser);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
