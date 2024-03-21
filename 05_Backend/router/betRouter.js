const express = require("express");
const router = express.Router(); 


// Load environment variables
require("dotenv").config();

// Import middleware

const betController = require("../controller/betController");
const { verifyToken } = require("../middleware/auth"); 

router.post("/postBet", betController.postBet); 
router.get("/getBetsByPostId", betController.getBetsByPostId);

module.exports = router;
