const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 20,
      },
      category: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 20,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      duration: {
        type: Number,
        required: true,
        min: 1, // Minimum duration of 1 day
    },
      likes: {
        type: Number,
        default: 0,
      },
    }, {
      timestamps: true // Automatically add createdAt and updatedAt fields
    });

// Create the Post model
const Post = mongoose.model("Post", postSchema);

// Export the Post model
module.exports = Post;
