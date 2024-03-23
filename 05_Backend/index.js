// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
// Create an Express application
const app = express();
const cors = require('cors');

// Connect to the database
require("./databse/connection");
// Load environment variables from .env file
require("dotenv").config();
// Set the port to listen for incoming requests
const port = process.env.SERVER_PORT;
// Middleware for parsing JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware for parsing JSON bodies
app.use(bodyParser.json());
const userRouter=require("./router/userRouter");
const postRouter=require("./router/postRouter");
const commentRouter =require("./router/commentRouter");
const betRouter =require("./router/bidRouter")

const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comments");
const Bid = require("./models/bid");

app.use("/users", userRouter);
app.use("/post", postRouter);
app.use("/comment",commentRouter);
app.use("/bid",betRouter);
// Get the default connection
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true, // optional, if you need to send cookies
  }));
  
  // Export the Express application
  module.exports = app;

