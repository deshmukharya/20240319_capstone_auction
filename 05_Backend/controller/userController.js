const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Import middleware
const { verifyToken } = require("../middleware/auth");  
const User = require("../models/user");
const { validateUsername, validateEmail, validatePassword } = require("../validators/userValidatos");

// Registration function
const register = async (req, res) => {
  try {
    // Validate request body
    validateUsername(req.body.username);
    validateEmail(req.body.email);
    validatePassword(req.body.password);

    const { username, email, password } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "Email is already in use.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User document with provided user details
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new User document to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);

    // Check if the error is a validation error
    if (
      error.name === "ValidationError" ||
      error.message.startsWith("ValidationError")
    ) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};



// POST endpoint for user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    try {
      validateEmail(email); // Validate email
      validatePassword(password); // Validate password
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }
    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(200).json({
      message: "Login successful.",
      token: token,
      role:user.role,
      userId:user._id, 
      expiresIn: 3600, // Token expires in 1 Month
    });
    console.log("success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    register,
    login,
  };