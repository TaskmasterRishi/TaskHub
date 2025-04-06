import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SAVE_PROFILE } from "../actions/actionTypes"

const initialState = {
  loading: false,
  user: {},
  isLoggedIn: false,
  token: "",
  successMsg: "",
  errorMsg: "",
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: "", };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: {
          _id: action.payload.user._id,
          username: action.payload.user.username,
          email: action.payload.user.email
        },
        token: action.payload.token,
        successMsg: action.payload.msg,
        errorMsg: ""
      };
    case LOGIN_FAILURE:
      return { loading: false, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: action.payload.msg };
    case LOGOUT:
      return { loading: false, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: "" }
    case SAVE_PROFILE:
      return {
        ...state,
        isLoggedIn: true,
        user: {
          _id: action.payload.user._id,
          username: action.payload.user.username,
          email: action.payload.user.email
        },
        token: action.payload.token,
        successMsg: "",
        errorMsg: ""
      }
    default:
      return state;
  }
}

export default authReducer;