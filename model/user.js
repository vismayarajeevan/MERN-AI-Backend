const mongoose = require("mongoose");
// const { v4: uuidv4 } = require('uuid'); // Uncomment if you want to use UUID

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    
    password: {
      type: String,
    },
    otp: {
      type: String, 
    },
    
    verified: {
      type: Boolean,
      default: false,
    },
       
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("user", UserSchema);



