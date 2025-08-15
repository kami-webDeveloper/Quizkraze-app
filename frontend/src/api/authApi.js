import buildPostOptions from "../utils/buildPostOptions";
import request from "../utils/requestOperation";

export const signup = (formData) =>
  request(`/api/v1/auth/signup`, buildPostOptions(formData), "Signup failed");

export const login = (formData) =>
  request(`/api/v1/auth/login`, buildPostOptions(formData), "Login failed");

export const logout = () =>
  request(
    `/api/v1/auth/logout`,
    {
      method: "GET",
      credentials: "include",
    },
    "Logout failed"
  );

export const forgotPassword = (formData) =>
  request(
    `/api/v1/auth/forgot-password`,
    buildPostOptions(formData),
    "Something wrong happened!"
  );

export const resetPassword = (resetToken, formData) =>
  request(
    `/api/v1/auth/reset-password/${resetToken}`,
    buildPostOptions(formData),
    "Failed to reset password"
  );

export const updatePassword = (formData) =>
  request(
    `/api/v1/auth/update-password`,
    buildPostOptions(formData),
    "Failed to update password!"
  );

export const updateUsername = (formData) =>
  request(
    `/api/v1/auth/update-me`,
    buildPostOptions(formData),
    "Failed to update username!"
  );

export const getCurrentUser = () =>
  request(
    `/api/v1/auth/me`,
    {
      method: "GET",
      credentials: "include",
    },
    "User not authenticated"
  );
