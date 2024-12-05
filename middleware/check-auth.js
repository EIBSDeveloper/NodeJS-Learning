const jwt = require("jsonwebtoken");
const models = require("../models");

async function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    req.userDetails = await models.User.findByPk(decodedToken.userId);
    req.userData = decodedToken;

    console.log(req.userDetails);

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
