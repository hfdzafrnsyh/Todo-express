const express = require("express");
const cors = require('cors');
const router = express.Router();
const AuthController = require('../../controller/AuthController');

// const userController = new UserController(); 
const ErrorValidation = require('../../middleware/ErrorValidation');
const LoginRequest = require('../../request/LoginRequest');
const RegisterRequest = require('../../request/RegisterRequest');

router.use(cors());


router.post('/login' , LoginRequest , ErrorValidation , AuthController.login)
router.post('/register' , RegisterRequest , ErrorValidation, AuthController.register)



module.exports = router;