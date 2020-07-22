require("express-async-errors");
const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const mongoose = require("mongoose");
const path = require("path");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => logger.info("connected to mongoDB"))
  .catch((err) => logger.error(err));

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.get("*", (req, res) => {
  let url = path.join(__dirname, "build", "index.html");
  if (!url.startsWith("/app/")) {
    // since we're on local windows
    url = url.substring(1);
  }
  res.sendFile(url);
});

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
