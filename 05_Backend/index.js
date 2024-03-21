// Import required modules
const express = require("express");
const bodyParser = require("body-parser");

// Create an Express application
const app = express();

// Connect to the database
require("./databse/connection");

// Load environment variables from .env file
require("dotenv").config();

// Set the port to listen for incoming requests
const port = process.env.SERVER_PORT;

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

const userRouter=require("./router/userRouter");
const postRouter=require("./router/postRouter");
const commentRouter =require("./router/commentRouter");
const betRouter =require("./router/betRouter")

const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comments");
const Bet = require("./models/bet");


app.use("/users", userRouter);
app.use("/post", postRouter);
// Connect to MongoDB
app.use("/comment",commentRouter);
app.use("/bet",betRouter);
// Get the default connection
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  
  // Export the Express application
  module.exports = app;

