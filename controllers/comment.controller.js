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

async function index(req, res) {
  const userId = req.userData.userId;
  const postId = req.params.id;

  try {
    // const user = await models.User.findByPk(userId);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    const post = await models.Post.findByPk(postId, {
      include: [models.Comment],
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const category = await models.Category.findByPk(post.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      post: {
        userName: req.userDetails.name,
        categoryName: category.name,
        ...post.dataValues,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message || err,
    });
  }
}

module.exports = {
  save: save,
  index: index,
};
