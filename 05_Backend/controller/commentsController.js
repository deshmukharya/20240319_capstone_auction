const Post = require("../models/post");
const User = require("../models/user");
const Comment = require('../models/comments');

const postComment = async (req, res) => {
    try {
      // Validate request body
      const { postId, userId, comment } = req.body;
      if (!postId || !userId || !comment) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      // Check if the post exists
      const postExists = await Post.exists({ _id: postId });
      if (!postExists) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
  
      // Check if the user exists
      const userExists = await User.exists({ _id: userId });
      if (!userExists) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
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
    try {
      // Extract post ID from query parameters
      const postId = req.query.postId;
  
      // Validate post ID
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