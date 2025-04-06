const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  joiningTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});


const User = mongoose.model("User", userSchema);
module.exports = User;