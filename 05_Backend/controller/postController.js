const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const { verifyToken } = require("../middleware/auth");

const createPost = async (req, res) => {
    try {
        // Validate request body
        const { name, category, image, price, startDateTime, duration } = req.body;
        if (!name || !category || !image || !price || !startDateTime|| !duration) {
          return res.status(400).json({ success: false, message: "Missing required fields" });
        }
    
        // Verify token from request headers
    
        // Create a new Post document with the provided data
        const newPost = new Post({
          name,
          category,
          image,
          price,
          startDateTime,
          duration
        });
    
        // Save the post
        const savedPost = await newPost.save();
    
        res.status(201).json({ success: true, message: "Post created successfully", post: savedPost });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    }

    const getAllPosts = async (req, res) => {
        try {
          // Retrieve all posts from the database
          const posts = await Post.find();
      
          res.status(200).json({ success: true, message: "Posts retrieved successfully", posts });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Internal Server Error" });
        }
      };


      const getPostById = async (req, res) => {
        try {
          const postId = req.query.id; // Retrieve postId from query parameters
      
          if (!postId) {
            return res.status(400).json({ success: false, message: "Post ID is required" });
          }
      
          // Retrieve the post from the database by its ID
          const post = await Post.findById(postId);
      
          if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
          }
      
          res.status(200).json({ success: true, message: "Post retrieved successfully", post });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Internal Server Error" });
        }
      }; 
      const addLike = async (req, res) => {
        try {
          // Extract post ID from query parameters
          const postId = req.query.postId;
      
          // Validate post ID
          if (!postId) {
            return res.status(400).json({ success: false, message: "Post ID is required" });
          }
      
          // Find the post by its ID
          const post = await Post.findById(postId);
      
          // Check if the post exists
          if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
          }
      
          // Increment the likes count
          post.likes += 1;
      
          // Save the updated post
          const updatedPost = await post.save();
      
          res.status(200).json({ success: true, message: "Like added successfully", post: updatedPost });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Internal Server Error" });
        }
      };

      const getLikes = async (req, res) => {
        try {
          // Extract post ID from query parameters
          const postId = req.query.postId;
      
          // Validate post ID
          if (!postId) {
            return res.status(400).json({ success: false, message: "Post ID is required" });
          }
      
          // Find the post by its ID
          const post = await Post.findById(postId);
      
          // Check if the post exists
          if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
          }
      
          res.status(200).json({ success: true, likes: post.likes });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Internal Server Error" });
        }
      };

    const deletePost = async (req, res) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }
        // Verify and decode the token
        const extractedToken = token.replace('Bearer ', '');
        const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);

        // Extract postId from query parameters
        const postId = req.query.postId;

        // Find the post by its ID and delete it
        const deletedPost = await Post.findByIdAndDelete(postId);

        // If the post is not found, return 404 Not Found
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Return success message upon successful deletion
        res.json({ success: true, message: 'Post deleted successfully', deletedPost });
    } catch (error) {
        // Return 500 Internal Server Error if any error occurs
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};




// Save file to server storage


module.exports = { createPost,getAllPosts,getPostById,addLike,getLikes,deletePost };

