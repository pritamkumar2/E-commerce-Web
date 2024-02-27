import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  RESET_PASSWORD_SUCCESS,
  LOGOUT,
} from "./ActionTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api, { API_BASE_URL } from "../../config/api";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    // Check if the user is verified

if(response.status === 200) {
  toast.success(` ${response.data.message} vrefication mail sent successfully`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}



    if (user.isVerified) {
      // Store JWT token in localStorage
      if (user.jwt) localStorage.setItem("jwt", user.jwt);

      dispatch(registerSuccess(user));
    } else {
      console.log("User is not verified");
      // Handle case where user is not verified
    }
  } catch (error) {
    dispatch(registerFailure(error.message));
    console.log(error);
    toast.error(`${error.response.data.error}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (user.jwt) localStorage.setItem("jwt", user.jwt);
    console.log("login ", user);
    dispatch(loginSuccess(user));
  } catch (error) {
    console.log("error", error);
    dispatch(loginFailure(error.message));
    toast.error("invalid credintials", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

//  get user from token
export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      console.log("req User ", user);
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
      toast.error(`${error.response.data.error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
};

export const logout = (token) => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  };
};

const sendOTPRequest = () => ({ type: SEND_OTP_REQUEST });
const sendOTPSuccess = () => ({ type: SEND_OTP_SUCCESS });
const sendOTPFailure = (error) => ({ type: SEND_OTP_FAILURE, payload: error });

const verifyOTPRequest = () => ({ type: VERIFY_OTP_REQUEST });
const verifyOTPSuccess = () => ({ type: VERIFY_OTP_SUCCESS });
const verifyOTPFailure = (error) => ({
  type: VERIFY_OTP_FAILURE,
  payload: error,
});

// Send OTP action
export const sendOTP = (email) => async (dispatch) => {
  dispatch(sendOTPRequest());
  try {
    await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
    console.log("the auth token",API_BASE_URL)
    dispatch(sendOTPSuccess());
  } catch (error) {
    dispatch(sendOTPFailure(error.message));
    toast.error(`${error.response.data.error}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

// Verify OTP and update password action
export const verifyOTPAndUpdatePassword =
  (email, otp, newPassword) => async (dispatch) => {
    dispatch(verifyOTPRequest());
    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      dispatch(verifyOTPSuccess());
      const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS });
    } catch (error) {
      dispatch(verifyOTPFailure(error.message));
      toast.error(`${error.response.data.error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
