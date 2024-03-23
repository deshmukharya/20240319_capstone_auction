const Post = require("../models/post");
const User = require("../models/user");
const Comment = require('../models/comments');
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/auth");


const postComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const userId = req.query.userId;

        if (!postId || !userId || !comment) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        // Verify token from request headers
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }
        const extractedToken = token.replace("Bearer ", "");
        const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
        // Create a new Comment document with the provided data
        const newComment = new Comment({
            postId,
            userId,
            comment,
        });
        // Save the comment
        const savedComment = await newComment.save();
        res.status(201).json({ success: true, message: "Comment added successfully", comment: savedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
  const getCommentsByPostId = async (req, res) => {
    const postId = req.query.postId;
    try {
      if (!postId) {
        return res.status(400).json({ success: false, message: "Post ID is required" });
      }
      // Find all comments associated with the given post ID
      const comments = await Comment.find({ postId });
      res.status(200).json({ success: true, message: "Comments retrieved successfully", comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
module.exports = { postComment,getCommentsByPostId };