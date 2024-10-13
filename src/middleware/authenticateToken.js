const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from header
  if (!token) {
    console.log("No token found in the request headers."); // Log if no token is found
    return res.sendStatus(401); // Unauthorized if no token
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err.message); // Log the error if token verification fails
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
