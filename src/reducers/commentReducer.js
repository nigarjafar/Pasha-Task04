import { POST_COMMENTS_FETCHED, COMMENTS_LOADING } from "../actions/types";

export default (state = { loading: true, data: [] }, action) => {
  switch (action.type) {
    case POST_COMMENTS_FETCHED:
      return { ...state, data: action.payload };
    case COMMENTS_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
