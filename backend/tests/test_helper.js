const Blog = require("../models/blog");
const User = require("../models/users");

const initialBlogs = [
  {
    title: "Hello World",
    author: "John Doe",
    url: "https://example.com",
    likes: 25,
  },
  {
    title: "Analytics will rule the world",
    author: "Jane Doe",
    url: "https://google.com",
    likes: 100,
  },
  {
    title: "I want to be King of the World",
    author: "John Doe",
    url: "https://youtube.com",
    likes: 10,
  },
];

const authorizedUser = {
  username: "root",
  password: "sekret",
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Test Test",
    author: "John Doe",
    url: "https://example.com",
    likes: 1,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  authorizedUser,
};
