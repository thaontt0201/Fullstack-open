const config = require("./utils/config");
const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middlewares");

mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use(middleware.errorHandler);
module.exports = app;
