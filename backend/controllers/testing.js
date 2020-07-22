const testingRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/users");

testingRouter.post("/reset", async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  res.status(204).end();
});

module.exports = testingRouter;
