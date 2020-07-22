const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "CREATE_NOTIFICATION":
      return action.notification;
    case "HIDE_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

export const createNotification = (message, isError, timeInSeconds) => {
  return async (dispatch) => {
    dispatch({
      type: "CREATE_NOTIFICATION",
      notification: {
        message,
        isError,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "HIDE_NOTIFICATION",
        notification: null,
      });
    }, timeInSeconds * 1000);
  };
};

export default notificationReducer;
