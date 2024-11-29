const jwt = require("jsonwebtoken");

// Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ message: "Accès refusé. Token manquant." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide." });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateJWT };
