const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number, // Corrected type
    required: true,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  aadharCardNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String, // Corrected type
    required: true,
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

// Pre-save hook: userSchema.pre("save", ...) runs before the save action, allowing us to modify or validate the data
userSchema.pre("save", async function (next) {
  // storing all the person data
  const person = this;
  // hash the password only if it new or modified
  if (!person.isModified("password")) {
    return next();
    //The person.isModified("person") checks if the password field has changed. If it hasn't, it skips the hashing.
  }
  try {
    // hash password generate and generating salts
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

// comapre function automatically extracts out the salt from the stored hashed password and uses it to hash the entered password, remember ENTERED PASSWORD. It compares the resulting hash with the stored hash. If they match, it indicates that the password entered was correct.

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatched = await bcrypt.compare(candidatePassword, this.password);
    return isMatched;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema); // Capitalized model name
module.exports = User;
