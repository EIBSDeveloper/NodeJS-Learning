const { where } = require("sequelize");
const validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const comment = {
    content: req.body.content,
    postId: req.params.id,
    userId: req.userData.userId, //Will come from the token
  };

  models.Comment.create(comment)
    .then((result) => {
      res.status(200).json({
        message: "Commented Successfully!!",
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

function index(req, res) {
  const userId = req.userData.userId;
  const postId = req.params.id;
  const categoryName = "";
  console.log(userId);

  models.User.findByPk(userId)
    .then((result1) => {
      models.Post.findByPk(postId, {
        include: [models.Comment],
      })
        .then((result2) => {
          models.Category.findByPk(result2.categoryId)
            .then((result) => {
              res.status(200).json({
                post: {
                  userName: result1.name,
                  categoryName: result.name,
                  ...result2.dataValues,
                },
              });
            })
            .catch((err) => {});
        })
        .catch((err) => {
          res.status(500).json({
            message: "Something went wrong",
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  save: save,
  //   show: show,
  index: index,
  //   update: update,
  //   destory: destory,
};
