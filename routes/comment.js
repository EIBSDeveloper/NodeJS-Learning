const express = require("express");
const commentsController = require("../controllers/comment.controller");
const checkAuthMidddleware = require("../middleware/check-auth");
const router = express.Router();

router.post("/:id", checkAuthMidddleware.checkAuth, commentsController.save);
router.get("/:id", checkAuthMidddleware.checkAuth, commentsController.index);
// router.get("/:id", commentsController.show);
// router.patch("/:id", checkAuthMidddleware.checkAuth, commentsController.update);
// router.delete(
//   "/:id",
//   checkAuthMidddleware.checkAuth,
//   commentsController.destory
// );

module.exports = router;
