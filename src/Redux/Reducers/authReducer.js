import { AUTH_SUCCESS, AUTH_FAILURE } from "../Actions/type";

const initialState = {
  auth: [],
  error: "",
  status: "PLEASE LOGIN!",
  isLoggedIn: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        auth: action.payload.data,
        status: AUTH_SUCCESS,
        isLoggedIn: true,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        error: action.error,
        status: AUTH_FAILURE,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
