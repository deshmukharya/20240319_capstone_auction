const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    trim: true,
    required: true,
  },
});

// Create the Comment model
const Comment = mongoose.model("Comment", commentSchema);

// Export the Comment model
module.exports = Comment;
