const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  if (!body.title || !body.url) {
    return response.status(400).end();
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    comments: body.comments ? body.comments : [],
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog.toJSON());
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user");
  if (!blog) {
    return response.status(404).end();
  }
  return response.json(blog.toJSON());
});

blogRouter.put("/:id", async (request, response) => {
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const decodedToken = jwt.verify(token, "process.env.SECRET");
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const currentBlog = await Blog.findById(request.params.id);
  const userId = user._id.toString();
  const blogUserId = currentBlog.user.toString();

  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(201).json(updatedBlog.toJSON());
});

blogRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const decodedToken = jwt.verify(token, "process.env.SECRET");
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);
  const userId = user._id.toString();
  const blogUserId = blog.user.toString();

  if (userId !== blogUserId) {
    return response.status(401).json({ error: "Unauthorized user" });
  }

  await Blog.findByIdAndRemove(request.params.id);

  let updatedUser = user;
  updatedUser.blogs = user.blogs.filter(
    (blog) => blog.id !== request.params.id
  );

  await User.findByIdAndUpdate(userId, updatedUser, { new: true });
  response.status(204).end();
});

// Comments

blogRouter.post("/:id/comments", async (request, response) => {
  const token = request.token;
  if (!token) {
    console.log("No Token");
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const decodedToken = jwt.verify(token, "process.env.SECRET");
  if (!decodedToken.id) {
    console.log("Bad Token");
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(201).json(updatedBlog.toJSON());
});

module.exports = blogRouter;
