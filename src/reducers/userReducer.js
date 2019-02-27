import { USER_FETCHED, USERS_LOADING } from "../actions/types";

export default (state = { loading: true, data: [] }, action) => {
  switch (action.type) {
    case USER_FETCHED:
      return { ...state, data: [...state.data, action.payload] };
    case USERS_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
