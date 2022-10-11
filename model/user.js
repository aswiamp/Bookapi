const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 2,
    maxlength: 40,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.name ,role:this.role},
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    )
  }
module.exports = mongoose.model('User', UserSchema);
