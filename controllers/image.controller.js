function upload(req, res) {
  if (req.file.filename) {
    res.status(201).json({
      message: "Image uploaded Successfully!!!",
      url: req.file.filename,
    });
  } else {
    res.statis(500).json({
      message: "Something went Wrong",
    });
  }
}

module.exports = {
  upload: upload,
};
