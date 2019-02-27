import {
  POSTS_FETCHED,
  POSTS_LOADING,
  POST_CREATE,
  POST_FETCHED
} from "../actions/types";

export default (state = { loading: true, data: [] }, action) => {
  switch (action.type) {
    case POSTS_FETCHED:
      return { ...state, data: action.payload };
    case POSTS_LOADING:
      return { ...state, loading: action.payload };
    case POST_CREATE: {
      return { ...state, data: [...state.data, action.payload] };
    }
    case POST_FETCHED: {
      return { ...state, data: [...state.data, action.payload] };
    }

    default:
      return state;
  }
};
