const express = require("express");
const {
  save,
  index,
  show,
  update,
  destory,
} = require("../controllers/post.controller");
const { checkAuth } = require("../middleware/check-auth");
const router = express.Router();

router.get("/", index);
router.get("/:id", show);

router.use(checkAuth);
router.post("/", save);
router.patch("/:id", update);
router.delete("/:id", destory);

module.exports = router;
