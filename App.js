const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const postsRoute = require("./routes/posts");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/image");
const commentRoute = require("./routes/comment");

//using as a middleware
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/posts", postsRoute);
app.use("/user", userRoute);
app.use("/images", imageRoute);
app.use("/comment", commentRoute);

module.exports = app;
