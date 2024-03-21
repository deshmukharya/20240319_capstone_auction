const mongoose = require("mongoose");

const betSchema = new mongoose.Schema({
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
        min: 0,
      },
    }, {
      timestamps: true // Automatically add createdAt and updatedAt fields
    });

// Create the Bet model
const Bet = mongoose.model("Bet", betSchema);

// Export the Bet model
module.exports = Bet;