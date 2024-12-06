const express = require("express");
const { upload } = require("../controllers/image.controller");
const imageUploader = require("../helpers/image-uploader");
const { checkAuth } = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth);
router.post("/uploads", imageUploader.upload.single("image"), upload);

module.exports = router;
