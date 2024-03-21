// Validation function for username
const validateUsername = (username) => {
    if (!username || username.length < 5) {
      throw new Error("Username must be at least 5 characters long.");
    }
  };
  
  // Validation function for email
  const validateEmail = (email) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email address.");
    }
  };
  
  // Validation function for password
  const validatePassword = (password) => {
    if (!password || password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }
  };
  
  module.exports = {
    validateUsername,
    validateEmail,
    validatePassword,
  };