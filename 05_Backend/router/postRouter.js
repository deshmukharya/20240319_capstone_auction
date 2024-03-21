const express = require("express");
const router = express.Router(); 


// Load environment variables
require("dotenv").config();

// Import middleware

const postController = require("../controller/postController");
const { verifyToken } = require("../middleware/auth"); 

router.post("/createPost", postController.createPost); 
router.get("/getAllPosts", postController.getAllPosts); 
router.get("/getPostById", postController.getPostById); 
router.post("/addLike", postController.addLike); 
router.get("/getLikes", postController.getLikes); 
router.delete("/deletePost", postController.deletePost); 
module.exports = router;