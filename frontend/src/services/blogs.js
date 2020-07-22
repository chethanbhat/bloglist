import axios from "axios";
const baseUrl = "/api/blogs";
let authToken = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: authToken },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const updateLikes = async (blog) => {
  const config = {
    headers: { Authorization: authToken },
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: authToken },
  };
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};

const commentBlog = async (blog) => {
  const config = {
    headers: { Authorization: authToken },
  };
  const response = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    blog,
    config
  );
  return response.data;
};

const setToken = (token) => {
  authToken = `bearer ${token}`;
};

export default {
  getAll,
  createBlog,
  updateLikes,
  deleteBlog,
  commentBlog,
  setToken,
};
