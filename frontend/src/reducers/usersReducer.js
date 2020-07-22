import usersService from "../services/users";

const sortByBlogs = (users) => {
  return users.sort((user1, user2) => user2.blogs.length - user1.blogs.length);
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      return sortByBlogs(action.users);
    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch({
      type: "INIT_USERS",
      users,
    });
  };
};

export default usersReducer;
