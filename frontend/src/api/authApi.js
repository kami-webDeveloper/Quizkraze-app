import buildPostOptions from "../utils/buildPostOptions";
import request from "../utils/requestOperation";

const API_BASE_URL = import.meta.env.VITE_API_TARGET;

export const signup = (formData) =>
  request(
    `${API_BASE_URL}/api/v1/auth/signup`,
    buildPostOptions(formData),
    "Signup failed"
  );

export const login = (formData) =>
  request(
    `${API_BASE_URL}/api/v1/auth/login`,
    buildPostOptions(formData),
    "Login failed"
  );

export const logout = () =>
  request(
    `${API_BASE_URL}/api/v1/auth/logout`,
    {
      method: "GET",
      credentials: "include",
    },
    "Logout failed"
  );

export const forgotPassword = (formData) =>
  request(
    `${API_BASE_URL}/api/v1/auth/forgot-password`,
    buildPostOptions(formData),
    "Something wrong happened!"
  );

export const resetPassword = (resetToken, formData) =>
  request(
    `${API_BASE_URL}/api/v1/auth/reset-password/${resetToken}`,
    buildPostOptions(formData),
    "Failed to reset password"
  );

export const updatePassword = (formData) =>
  request(
    `${API_BASE_URL}/api/v1/auth/update-password`,
    buildPostOptions(formData),
    "Failed to update password!"
  );

export const updateUsername = (formData) =>
  request(
    `${API_BASE_URL}/api/v1/auth/update-me`,
    buildPostOptions(formData),
    "Failed to update username!"
  );

export const getCurrentUser = () =>
  request(
    `${API_BASE_URL}/api/v1/auth/me`,
    {
      method: "GET",
      credentials: "include",
    },
    "User not authenticated"
  );
