import authService from "../services/auth";
import { createNotification } from "./notificationReducer";

const authReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_USER":
      return action.user;
    case "SAVE_USER":
      return action.user;
    case "CLEAR_USER":
      return action.user;
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    filter,
  };
};

const saveUserToLocalStorage = (user) => {
  JSON.stringify(
    window.localStorage.setItem("bloglistUser", JSON.stringify(user))
  );
};

const getUserFromLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem("bloglistUser"));
};

const removeUserFromLocalStorage = () => {
  return window.localStorage.removeItem("bloglistUser");
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await authService.login(credentials);
    if (user) {
      saveUserToLocalStorage(user);
      dispatch({
        type: "SAVE_USER",
        user,
      });
    } else {
      dispatch(createNotification(`Invalid Credentials`, true, 5));
    }
  };
};

export const signupUser = (credentials) => {
  return async (dispatch) => {
    const user = await authService.signup(credentials);
    if (user) {
      dispatch(
        createNotification(
          `Registration Successful. Login to continue`,
          false,
          10
        )
      );
      dispatch({
        type: "NEW_USER",
        user: null,
      });
    } else {
      dispatch(createNotification(`Invalid Request`, true, 5));
    }
  };
};

export const getUser = () => {
  return (dispatch) => {
    const user = getUserFromLocalStorage();
    dispatch({
      type: "GET_USER",
      user,
    });
  };
};

export const clearUser = () => {
  return (dispatch) => {
    removeUserFromLocalStorage();
    dispatch({
      type: "GET_USER",
      user: null,
    });
  };
};

export const setToken = () => {};

export const getToken = () => {};

export default authReducer;
