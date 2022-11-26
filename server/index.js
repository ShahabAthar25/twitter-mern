const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

const AuthRoute = require("./routes/Auth.Route");
const PostsRoute = require("./routes/Posts.Route");
const CommentsRoute = require("./routes/Comments.Route");
const UsersRoute = require("./routes/Users.Route");
const BookmarksRoute = require("./routes/Bookmarks.Route");
const HashTagsRoute = require("./routes/HashTags.Route");
require("./helpers/MongoDB");
require("./helpers/Redis");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use("/auth", AuthRoute);
app.use("/posts", PostsRoute);
app.use("/comments", CommentsRoute);
app.use("/users", UsersRoute);
app.use("/bookmarks", BookmarksRoute);
app.use("/hashtags", BookmarksRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use(async (err, req, res, next) => {
  if (err.name === "CastError") {
    err.status = 404;
    err.message = "Not Found";
    console.log(err.message);
  } else if (err.name === "ValidationError") {
    err.status = 422;
  } else if (!err.status) {
    err.status = 500;
    console.log(err);
  }
  res.status(err.status).json({
    error: {
      status: err.status,
      message: err.status === 500 ? "Internal Server Error" : err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
