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

    // Regular expressions for special characters and capital letters
    const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const capitalLetterRegex = /[A-Z]/;

    // Check if the password contains at least one special character
    if (!specialCharactersRegex.test(password)) {
        throw new Error("Password must contain at least one special character.");
    }

    // Check if the password contains at least one capital letter
    if (!capitalLetterRegex.test(password)) {
        throw new Error("Password must contain at least one capital letter.");
    }
};
  
  module.exports = {
    validateUsername,
    validateEmail,
    validatePassword,
  };