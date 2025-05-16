const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please provide the email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide the password"]
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'student', 'teacher', 'librarian'],
    default: 'user'
  }
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

const User = mongoose.model('User', userSchema);
module.exports = User;

