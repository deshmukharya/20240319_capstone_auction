const express = require("express");
const router = express.Router(); 
// Load environment variables
require("dotenv").config();
// Import middleware
const commentsController = require("../controller/commentsController");
router.post("/postComment", commentsController.postComment); 
router.get("/getCommentsByPostId", commentsController.getCommentsByPostId); 
module.exports = router;