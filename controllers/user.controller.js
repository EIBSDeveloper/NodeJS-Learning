const models = require("../models");
const bcryptjs = require("bcryptjs");
const e = require("express");
const jwt = require("jsonwebtoken");

function signUp(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email Already Exisity",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash, //We need to hash the password
            };

            models.User.create(user)
              .then((result) => {
                if (result) {
                  const token = jwt.sign(
                    {
                      email: user.email,
                      userId: user.id,
                    },
                    process.env.JWT_KEY,
                    function (err, token) {
                      res.status(200).json({
                        message: "User Created Successfully!!",
                        token: token,
                      });
                    }
                  );
                } else {
                  res.status(401).json({
                    message: "Invalid Credentails!",
                  });
                }
                // res.status(200).json({
                //   message: "User Created Successfully!!",
                // });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "Something went wrong",
                  error: err,
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

function login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid Credentails!",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                process.env.JWT_KEY,
                function (err, token) {
                  res.status(200).json({
                    message: "Loged In Scuuessfull..!!",
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Invalid Credentails!",
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went Wrong",
      });
    });
}

module.exports = {
  signUp: signUp,
  login: login,
};
