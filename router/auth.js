const express = require('express')
const router = new express.Router()

const userController = require('../controller/authController')

router.post('/register', userController.registerUser);
router.post('/verifyOtp', userController.verifyOTP);



module.exports= router