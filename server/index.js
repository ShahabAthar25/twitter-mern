const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

const AuthRoute = require("./routes/Auth.route");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, () => {
  console.log(`Connected to database`);
});

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    exposedHeaders: "Authorization",
  })
);

app.use("/auth", AuthRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      success: false,
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
