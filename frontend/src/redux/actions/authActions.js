import api from "../../api"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SAVE_PROFILE } from "./actionTypes"
import { toast } from "react-toastify";

export const postLoginData = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await api.post('/auth/login', { email, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: data.user,
        token: data.token
      }
    });
    localStorage.setItem('token', data.token);
    toast.success(data.msg);
  }
  catch (error) {
    const msg = error.response?.data?.msg || error.message;
    dispatch({
      type: LOGIN_FAILURE,
      payload: { msg }
    })
    toast.error(msg);
  }
}



export const saveProfile = (token) => async (dispatch) => {
  try {
    const { data } = await api.get('/profile', {
      headers: { Authorization: token }
    });
    if (!data.user) {
      throw new Error("User data not found in response");
    }
    dispatch({
      type: SAVE_PROFILE,
      payload: { 
        user: {
          ...data.user,
          name: data.user.name || data.user.email // Use email if name is not available
        }, 
        token 
      },
    });
  }
  catch (error) {
    console.error("Error fetching profile:", error);
    // Clear invalid token
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  }
}



export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
  document.location.href = '/';
}