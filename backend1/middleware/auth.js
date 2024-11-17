require("dotenv").config();

const { JWT_SECRET, DEV_SECRET } = process.env;
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new Error("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET || DEV_SECRET);
  } catch (err) {
    const error = new Error("Autorização necessária.");
    error.status = 401;
    next(error);
  }
  req.user = payload;

  next();
};
