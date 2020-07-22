import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import authReducer from "./reducers/authReducer";
import usersReducer from "./reducers/usersReducer";
import registerReducer from "./reducers/registerReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  user: authReducer,
  users: usersReducer,
  notification: notificationReducer,
  register: registerReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
