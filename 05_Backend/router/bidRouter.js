const express = require("express");
const router = express.Router(); 
// Load environment variables
require("dotenv").config();
// Import middleware
const betController = require("../controller/bidController");
const { verifyToken } = require("../middleware/auth"); 

router.post("/postBid", betController.postBid); 
router.get("/getBidsByPostId", betController.getBidsByPostId);

module.exports = router;
