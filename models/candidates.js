const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String, // Fixed typo
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  voters: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      votedAt: {
        type: Date,
        default: Date.now, // Fixed default value
      },
    },
  ],
  votesCount: {
    type: Number,
    default: 0,
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema); // Capitalized model name
module.exports = Candidate;
