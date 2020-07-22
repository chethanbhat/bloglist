import authService from "../services/auth";
import { createNotification } from "./notificationReducer";

const registerReducer = (state = false, action) => {
  switch (action.type) {
    case "NEW_USER":
      return action.user;
    default:
      return state;
  }
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
        user: true,
      });
    } else {
      dispatch(createNotification(`Invalid Request`, true, 5));
    }
  };
};

export default registerReducer;
