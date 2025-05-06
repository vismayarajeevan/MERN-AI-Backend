const express = require('express')
const router = new express.Router()

const userController = require('../controller/authController')

router.post('/register', userController.registerUser);


module.exports= router