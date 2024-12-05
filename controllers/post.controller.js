const { where } = require("sequelize");
const validator = require("fastest-validator");
const models = require("../models");

function save(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.category_id,
    userId: req.userData.userId, //Will come from the token
  };

  console.log(req.userData.userId);
  console.log(req.userData);

  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
    categoryId: { type: "number", optional: false },
  };

  const v = new validator();
  const validationResponse = v.validate(post, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation Failed",
      error: validationResponse,
    });
  }

  models.Category.findByPk(req.body.category_id)
    .then((result) => {
      if (result !== null) {
        models.Post.create(post)
          .then((result) => {
            res.status(201).json({
              message: "Post Created Successfully!!",
              post: result,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Something went wrong",
              error: err,
            });
          });
      } else {
        return res.status(400).json({
          message: "Invalid Category",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Invalid Category",
      });
    });
}

function show(req, res) {
  const id = req.params.id;

  models.Post.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: "Post Not Found",
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

function index(req, res) {
  models.Post.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

function update(req, res) {
  const id = req.params.id;
  const updatedPost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.category_id,
  };
  const userId = req.userData.userId;

  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
    categoryId: { type: "number", optional: false },
  };

  const v = new validator();
  const validationResponse = v.validate(updatedPost, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation Failed",
      error: validationResponse,
    });
  }

  models.Category.findByPk(req.body.category_id)
    .then((result) => {
      if (result !== null) {
        models.Post.update(updatedPost, { where: { id: id, userId: userId } })
          .then((result) => {
            if (result[0] === 0) {
              return res.status(404).json({
                message: "Post not found or no changes made.",
              });
            }

            res.status(200).json({
              message: "Post Updated Successfully!!",
              updatedPost: updatedPost,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Something went wrong",
              error: err,
            });
          });
      } else {
        return res.status(400).json({
          message: "Invalid Category",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Invalid Category",
      });
    });
}

function destory(req, res) {
  const id = req.params.id;
  const userId = req.userData.userId;

  models.Post.destroy({ where: { id: id, userId: userId } })
    .then((result) => {
      res.status(200).json({
        message: "Post Deleted Successfully!!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

module.exports = {
  save: save,
  show: show,
  index: index,
  update: update,
  destory: destory,
};
