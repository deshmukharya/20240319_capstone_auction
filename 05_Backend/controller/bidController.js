const Bet = require("../models/bid");
const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/auth");

const postBid = async (req, res) => {
    try {
      // Extract post ID from query parameters
      const postId = req.query.postId;
  
      // Validate request body
      const { userId, amount } = req.body;
      if (!postId || !userId || !amount) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      // Verify token from request headers
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
      }
  
      const extractedToken = token.replace("Bearer ", "");
      const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
  

      // Create a new Bet document with the provided data
      const newBet = new Bet({
        postId,
        userId,
        amount,
      });
  
      // Save the bet
      const savedBet = await newBet.save();
  
      res.status(201).json({ success: true, message: "Bet posted successfully", bet: savedBet });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  

const getBidsByPostId = async (req, res) => {
    try {
      // Extract post ID from query parameters
      const postId = req.query.postId;
  
      // Validate post ID
      if (!postId) {
        return res.status(400).json({ success: false, message: "Post ID is required" });
      }
  
      // Find all bets associated with the given post ID
      const bets = await Bet.find({ postId });
  
      res.status(200).json({ success: true, message: "Bid retrieved successfully", bid });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  

module.exports = { postBid,getBidsByPostId };
