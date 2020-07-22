const userRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/users");

const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users.map((u) => u.toJSON()));
});

userRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.username || !body.password) {
    return response.status(400).end();
  }
  if (body.password.length < 3) {
    return response.status(400).end();
  }
  // Bcrypt Config
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.json(savedUser.toJSON());
});

module.exports = userRouter;
