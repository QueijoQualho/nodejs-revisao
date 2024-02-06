import express from 'express'
import { register, login } from "../controller/loginController.js";
import { validEmail, validIfEmailExist, validName, validPassword } from '../service/validators.js';

const router = express.Router()

router.post('/singup', [validEmail, validName, validPassword, validIfEmailExist], register)

router.post('/login', [validEmail, validName, validPassword], login)

export default router