const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from request header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "Access Denied. No Token Provided.",
      });
    }

    // Remove "Bearer " from token
    const actualToken = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;

    // Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;