const express = require('express')
const router = new express.Router()

const userController = require('../controller/authController')

router.post('/register', userController.registerUser);
router.post('/verifyOtp', userController.verifyOTP);
router.post('/login', userController.login);




module.exports= router