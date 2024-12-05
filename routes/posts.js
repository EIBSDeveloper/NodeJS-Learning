const express = require("express");
const postsController = require("../controllers/post.controller");
const checkAuthMidddleware = require("../middleware/check-auth");
const router = express.Router();

router.post("/", checkAuthMidddleware.checkAuth, postsController.save);
router.get("/", postsController.index);
router.get("/:id", postsController.show);
router.patch("/:id", checkAuthMidddleware.checkAuth, postsController.update);
router.delete("/:id", checkAuthMidddleware.checkAuth, postsController.destory);

module.exports = router;
