const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  const header = req.headers.authorization;
  if (header) {
    const token = header.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, "gau-gau, ang-ang");
        return user;
      } catch (err) {
        throw new Error("invalid token");
      }
    }
  }
  throw new Error("token must be provided");
};
