import { Router } from 'express';
var router = Router();
import { loginValidator, signUpValidator } from '../middlewares/validations';
var { login, register } = require('../controller/userController').default;

/* POST users listing. */
router.post('/login', loginValidator, login)
router.post('/register', signUpValidator, register)

export default router;