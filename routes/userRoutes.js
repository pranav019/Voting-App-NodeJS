const express = require("express");
const router = express.Router();
// small u in user is for the token, Capital U in user is for the model/database

const User = require("../models/user");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

router.post("/signup", async (req, res, next) => {
  try {
    const data = req.body;
    const newUser = new User(data);

    // saving new user to database
    const response = await newUser.save();
    console.log("data saved");

    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);

    console.log("Token is :", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    // extract the username and password from request body
    const { aadharCardNumber, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // generate token
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);
    // return token as response
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

// Profile Route
// We use the jwtAuthMiddleware in the profile route to ensure that only authenticated users can access their profile information
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    // getting this from jwtAuthMiddleware
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const userID = req.user.id; // extract the data from the token
    const { currentPassword, newPassword } = req.body; // extract the current and new password from the req body

    // Find the user by userID
    const user = await User.findById(userID);
    // If the password does not match
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    console.log("Password updated");
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
