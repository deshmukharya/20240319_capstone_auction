const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
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
      amount: {
        type: Number,
        required: true,
        min: 500,
      },
    }, {
      timestamps: true // Automatically add createdAt and updatedAt fields
    });

// Create the Bet model
const Bid = mongoose.model("Bid", bidSchema);

// Export the Bet model
module.exports = Bid;