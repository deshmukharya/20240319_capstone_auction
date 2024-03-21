const express = require("express");
const router = express.Router(); 


// Load environment variables
require("dotenv").config();

// Import middleware

const userController = require("../controller/userController");
const { verifyToken } = require("../middleware/auth"); 

router.post("/register", userController.register); 

router.post("/login", userController.login); 

module.exports = router;
