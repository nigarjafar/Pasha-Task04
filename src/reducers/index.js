import { combineReducers } from "redux";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import userReducer from "./userReducer";

export default combineReducers({
  posts: postReducer,
  comments: commentReducer,
  users: userReducer
});
