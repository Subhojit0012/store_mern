const jwt = require("jsonwebtoken");

// * header Authorization for JWT token
const verifyJWT = (req, res, next) => {
  const authorize = req.headers.authorization || req.headers.Authorization;

  if (!authorize?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorize.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
