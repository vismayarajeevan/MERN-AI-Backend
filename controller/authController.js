const userModel = require('../model/user')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')


// nodemailer setup

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user : process.env.NodemailerMail,
        pass: process.env.NodemailerPassword
    }
  })
