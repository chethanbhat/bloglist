const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/users");

beforeAll(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", name: "Sudo", passwordHash });
  await user.save();
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    blogObject.user = user._id;
    await blogObject.save();
  }
});

describe("When there are some intial blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("blogs are returned with unique id", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    expect(blogs[0].id).toBeDefined();
  });
  test("there are three blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("the first blog is about Hello World", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].title).toBe("Hello World");
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);
    expect(titles).toContain("I want to be King of the World");
  });
});

describe("Addition of new blog", () => {
  test("a valid blog can be added", async () => {
    let authRequest = await api.post("/api/login").send(helper.authorizedUser);
    let token = "bearer " + authRequest.body.token;
    const newBlog = {
      title: "Async Await is easy",
      author: "Jane Doe",
      url: "https://fullstackopen.com",
      likes: 30,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", token)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const contents = blogsAtEnd.map((r) => r.title);

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(contents).toContain("Async Await is easy");
  });

  test("if blog is added without likes, default like needs to be 0", async () => {
    let authRequest = await api.post("/api/login").send(helper.authorizedUser);
    let token = "bearer " + authRequest.body.token;
    const newBlog = {
      title: "JavaScript is cool",
      author: "Brad Traversy",
      url: "https://traversymedia.com",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", token);

    const addedBlog = response.body;

    expect(addedBlog.likes).toEqual(0);
  });

  test("if blog is added without title return 400 Bad Request", async () => {
    let authRequest = await api.post("/api/login").send(helper.authorizedUser);
    let token = "bearer " + authRequest.body.token;

    const newBlog = {
      author: "Brad Traversy",
      url: "https://traversymedia.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", token)
      .expect(400);
  });

  test("if blog is added without url return 400 bad request", async () => {
    let authRequest = await api.post("/api/login").send(helper.authorizedUser);
    let token = "bearer " + authRequest.body.token;

    const newBlog = {
      title: "Some Random Title",
      author: "Brad Traversy",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", token)
      .expect(400);
  });

  test("if blog is added without title and url return 400 bad request", async () => {
    let authRequest = await api.post("/api/login").send(helper.authorizedUser);
    let token = "bearer " + authRequest.body.token;

    const newBlog = {
      author: "Brad Travery",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", token)
      .expect(400);
  });
});

describe("Delete a specific blog", () => {
  test("a blog can be deleted", async () => {
    let authRequest = await api.post("/api/login").send(helper.authorizedUser);
    let token = "bearer " + authRequest.body.token;

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", token)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    const contents = blogsAtEnd.map((r) => r.title);

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe("Updated a specific blog", () => {
  test("a blog can be updated", async () => {
    let authRequest = await api.post("/api/login").send(helper.authorizedUser);
    let token = "bearer " + authRequest.body.token;

    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    blogToUpdate.likes += 1;
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", token)
      .send(blogToUpdate)
      .expect(201);
    const updatedBlog = response.body;
    expect(updatedBlog.likes).toEqual(blogToUpdate.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
