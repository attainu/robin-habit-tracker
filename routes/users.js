var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var validate = require('../middlewares/validations');

/* POST users listing. */
router.post('/login', validate.loginValidator, userController.login)
router.post('/register', validate.signUpValidator, userController.register)

/* GET users listing. */


module.exports = router;