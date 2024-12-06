const jwt = require("jsonwebtoken");
const models = require("../models");

async function checkAuth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ") || !token) {
    return res.status(401).json({
      message: "Authorization token missing or malformed",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    req.userDetails = await models.User.findByPk(decodedToken.userId);
    req.userData = decodedToken;

    next(); //HandOver the function to the next avaliable middleware
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expire token!!",
      error: err,
    });
  }
}

module.exports = {
  checkAuth: checkAuth,
};
