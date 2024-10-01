const mongoose = require("mongoose");
const brcypt = require("brcypt");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    typr: String,
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
        default: Date.now(),
      },
    },
  ],
  votesCount: {
    type: Number,
    default: 0,
  },
});

const candidate = new mongoose.model("candidateModel", candidateSchema);
module.exports = candidate;
