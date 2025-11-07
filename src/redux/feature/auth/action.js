import { jwtDecode } from "jwt-decode";
import api from "../../../../utils/api";
import { toast } from "react-toastify";

import {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout as logoutAction,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} from "./authSlice";
export const loginWithGoogle = (googleToken) => async (dispatch) => {
  try {
    const res = await api.post("/auth/google/verify", {
      token: googleToken,
    });
    const { accessToken, refreshToken, user } = res.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userInfo", JSON.stringify(user));

    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure("Failed to login with Google"));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordStart());
    const res = await api.post("/auth/forgot-password", { email });
    dispatch(forgotPasswordSuccess(res.data.message));
    toast.success(
      res.data.message || "Password reset link sent to your email."
    );
  } catch (error) {
    dispatch(
      forgotPasswordFailure(
        error.response?.data?.message || "Failed to send reset link"
      )
    );
    toast.error(error.response?.data?.message || "Failed to send reset link.");
  }
};

export const resetPassword =
  ({ token, password }) =>
  async (dispatch) => {
    try {
      dispatch(resetPasswordStart());
      const res = await api.post(`/auth/reset-password/${token}`, { password });
      dispatch(resetPasswordSuccess(res.data.message));
      toast.success(
        res.data.message || "Password has been reset successfully."
      );
      return res.status;
    } catch (error) {
      dispatch(
        resetPasswordFailure(
          error.response?.data?.message || "Failed to reset password"
        )
      );
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  };
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(loginStart());
      const res = await api.post("/auth/login", { email, password });
      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        dispatch(loginSuccess(res.data));
      } else {
        dispatch(loginFailure(res.data.message || "Failed to login"));
        return res;
      }
      return res;
    } catch (error) {
      console.log("error ===== ", error);
      dispatch(
        loginFailure(error.response?.data?.message || "Failed to login")
      );
      return error;
    }
  };

export const signup =
  ({ username, email, password }) =>
  async (dispatch) => {
    try {
      dispatch(signupStart());
      const res = await api.post("/auth/signup", { username, email, password });
      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        dispatch(signupSuccess(res.data.user));
      } else {
        dispatch(signupFailure(res.data.message || "Failed to signup"));
      }
    } catch (error) {
      dispatch(
        signupFailure(error.response?.data?.message || "Failed to signup")
      );
    }
  };
const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    return false;
  }
};
export const validateToken = () => async (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    console.log(" no token ===== ");
    dispatch(logout());
    return;
  }

  if (!isTokenExpired(accessToken)) {
    console.log("no expired ===== ");
    dispatch(loginSuccess(JSON.parse(localStorage.getItem("userInfo"))));
    return;
  }

  try {
    const res = await api.post("/auth/token", { refreshToken });
    console.log("expired ===== ", res);
    if (res.data.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      dispatch(loginSuccess(JSON.parse(localStorage.getItem("userInfo"))));
    } else {
      dispatch(loginFailure("Invalid token"));
      dispatch(logout());
    }
  } catch (error) {
    dispatch(loginFailure("Failed to validate token"));
    dispatch(logout());
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("email");
  localStorage.removeItem("user-storage");
  localStorage.removeItem("sub");
  dispatch(logoutAction());
};
