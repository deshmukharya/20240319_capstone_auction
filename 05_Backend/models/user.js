const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    minlength: 5,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    maxlength: 100,
    validate: {
      validator: function (value) {
        // Basic email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 200,
  },
  mobileNumber: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
