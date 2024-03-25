const validateUserName = (username) => {
    if (!username) {
      throw new Error("Username is required.");
    }
    if (username.length < 4 || username.length > 20) {
      throw new Error("Username must be between 4 and 20 characters.");
    }
  };
  
  // validation function for email
  const validateEmail = (email) => {
    if (!email) {
      throw new Error("Email is required.");
    }
    if (email.length > 100) {
      throw new Error("Email must be at most 100 characters long.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email address.");
    }
  };
  
  // Validation function for password
  const validatePassword = (password) => {
    if (!password) {
      throw new Error("Password is required.");
    }
    if (password.length < 8 || password.length > 50) {
      throw new Error("Password must be between 8 and 50 characters long.");
    }
  };
  
  const createError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };
  // Validation function for role
  
  
  // validation function for user ID
  const validateUserId = (userId) => {
    if (!userId || typeof userId !== "string") {
      throw new Error("userId must be a non-empty string");
    }
  };
  
  const validateUser = (userData) => {
    validateUserName(userData.username);
    validateEmail(userData.email);
    validatePassword(userData.password);
  };
  
  module.exports = {
    validateUser,
    validateEmail,
    validatePassword,
    validateUserId, 
    createError,
  }