import blogService from "../services/blogs";

const sortByLikes = (blogs) => {
  return blogs.sort((blog1, blog2) => blog2.likes - blog1.likes);
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return sortByLikes([...state, action.data]);
    case "INIT_BLOG":
      return sortByLikes(action.data);
    case "LIKE_BLOG":
      return sortByLikes(
        state.map((blog) => (blog.id === action.data.id ? action.data : blog))
      );
    case "COMMENT_BLOG":
      return sortByLikes(
        state.map((blog) => (blog.id === action.data.id ? action.data : blog))
      );
    case "DELETE_BLOG":
      return sortByLikes(
        state.filter((blog) => blog.title !== action.data.title)
      );
    default:
      return sortByLikes(state);
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOG",
      data: blogs,
    });
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(blog);
    dispatch({
      type: "NEW_BLOG",
      data: newBlog,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    blog.likes += 1;
    const likedBlog = await blogService.updateLikes(blog);
    dispatch({
      type: "LIKE_BLOG",
      data: likedBlog,
    });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog);
    dispatch({
      type: "DELETE_BLOG",
      data: blog,
    });
  };
};

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    blog.comments.push(comment);
    const commentedBlog = await blogService.commentBlog(blog);
    dispatch({
      type: "COMMENT_BLOG",
      data: commentedBlog,
    });
  };
};

export default blogReducer;
