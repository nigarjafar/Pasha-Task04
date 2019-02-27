import {
  POSTS_LOADING,
  POSTS_FETCHED,
  POST_CREATE,
  POST_FETCHED,
  POST_COMMENTS_FETCHED,
  COMMENTS_LOADING,
  USER_FETCHED,
  USERS_LOADING
} from "./types";
import jsonplaceholder from "../apis/jsonplaceholder";
import _ from "lodash";

/* Post actions */

const setPostLoadingState = loadingState => {
  return {
    type: POSTS_LOADING,
    payload: loadingState
  };
};

export const fetchPost = id => async dispatch => {
  dispatch(setPostLoadingState(true));

  const result = await jsonplaceholder.get(`/posts/${id}`);

  dispatch({
    type: POST_FETCHED,
    payload: result.data
  });

  dispatch(setPostLoadingState(false));
};

export const fetchPosts = () => async dispatch => {
  dispatch(setPostLoadingState(true));

  const result = await jsonplaceholder.get("/posts");

  dispatch({
    type: POSTS_FETCHED,
    payload: result.data
  });

  dispatch(setPostLoadingState(false));
};

export const createPost = formBody => async dispatch => {
  dispatch(setPostLoadingState(true));

  const result = await jsonplaceholder.post("/posts", formBody);

  dispatch({
    type: POST_CREATE,
    payload: result.data
  });

  dispatch(setPostLoadingState(false));
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts.data)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPostandDetails = id => async (dispatch, getState) => {
  await dispatch(fetchPost(id));
  const post = getState().posts.data.find(post => post.id == id);

  dispatch(fetchUser(post.userId));
  dispatch(fetchPostComments(id));
};

/* Comment Actions */
const setCommentLoadingState = loadingState => {
  return {
    type: COMMENTS_LOADING,
    payload: loadingState
  };
};

export const fetchPostComments = postId => async dispatch => {
  dispatch(setCommentLoadingState(true));

  const result = await jsonplaceholder.get(`/posts/${postId}/comments`);

  dispatch({
    type: POST_COMMENTS_FETCHED,
    payload: result.data
  });

  dispatch(setCommentLoadingState(false));
};

/*User Actions */
const setUserLoadingState = loadingState => {
  return {
    type: USERS_LOADING,
    payload: loadingState
  };
};

export const fetchUser = id => async dispatch => {
  const result = await jsonplaceholder.get(`/users/${id}`);

  dispatch({
    type: USER_FETCHED,
    payload: result.data
  });
};
