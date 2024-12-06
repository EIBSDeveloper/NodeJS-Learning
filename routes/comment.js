const express = require("express");
const { save, index } = require("../controllers/comment.controller");
const { checkAuth } = require("../middleware/check-auth");
const router = express.Router();

router.use(checkAuth);
router.post("/:id", save);
router.get("/:id", index);

module.exports = router;
