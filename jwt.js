const jwt = require("jsonwebtoken");

// function to generate JWT token
const generateToken = (userdata) => {
  return jwt.sign(userdata, process.env.JWT_SECRET, { expiresIn: 30000 });
};

const jwtAuthMiddleware = (req, res, next) => {
  // Check if the request headers contain authorization
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  // Extract the JWT token from the request headers
  const token = authorization.split(" ")[1]; // Correct splitting of token
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { jwtAuthMiddleware, generateToken };
