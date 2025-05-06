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

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function registerUser(req, res) {
  try {
    const { userName, email, password } = req.body;

    // Validate required fields
    if (!userName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a strictly numeric 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // Random 6-digit integer

   
    let user = await userModel.findOne({ email });

    if (user) {
      if (user.verified) {
        return res.status(400).json({ message: 'User already registered and verified with this email' });

      } else {
       
        user.otp = otp;
        user.password = hashedPassword;
      }
    } else {
     
      user = new userModel({
        userName,
        email,
        password: hashedPassword,
        verified: false,
        otp,
      });
    }

    
    await user.save();

    // Send OTP to email
    await transporter.sendMail({
      from: process.env.NodemailerMail,
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for verification is: ${otp}`,
    });

    res.status(200).json({ message: 'OTP sent successfully' });

  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
}

// verify otp

// Verify OTP
async function verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;
  
      const user = await userModel.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (user.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
  
      
  
      // Mark user as verified
      user.verified = true;
      user.otp = '';
       
      await user.save();
  
      res.status(200).json({ message: 'User verified successfully' });
    } catch (error) {
      console.error('Error during OTP verification:', error);
      res.status(500).json({ message: 'Failed to verify OTP' });
    }
  }



module.exports = { registerUser,verifyOTP };
