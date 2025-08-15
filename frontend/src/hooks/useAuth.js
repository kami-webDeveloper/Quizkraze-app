import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/authApi";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../ui/toasts";

export function useSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: api.signup,
    onSuccess: (data) => {
      const user = data?.data?.user;

      if (user) dispatch(setUser(user));
      showSuccess("Account created successfully!");

      navigate("/app");
    },
    onError: (err) => {
      console.error(err);

      showError(err.message || "Signup failed!");
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: api.login,
    onSuccess: (data) => {
      const user = data?.data?.user;

      if (user) dispatch(setUser(user));

      showSuccess("Logged in successfully!");

      setTimeout(() => navigate("/app"), 1000);
    },
    onError: (err) => {
      console.error(err);

      showError(err.message || "Login failed!");
    },
  });
}

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      dispatch(clearUser());

      showSuccess("Logged out successfully!");

      navigate("/auth/login");
    },
    onError: (err) => {
      showError(err.message || "Logout failed!");
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: api.forgotPassword,
    onSuccess: (data) => {
      const dataMessaege = data?.message;

      showSuccess(dataMessaege);
    },
    onError: (err) => {
      console.error(err);

      showError(err.message || "Failed to send email! please try again.");
    },
  });
}

export function useResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ resetToken, password, passwordConfirm }) =>
      api.resetPassword(resetToken, { password, passwordConfirm }),
    onSuccess: (data) => {
      const user = data?.data?.user;

      if (user) dispatch(setUser(user));

      showSuccess("Password reset successfully and logged in!");

      setTimeout(() => navigate("/app"), 1000);
    },
    onError: (err) => {
      console.error(err);

      showError(err.message || "Failed to update password!");
    },
  });
}

export function useUpdatePassword() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.updatePassword,
    onSuccess: (data) => {
      const user = data?.data?.user;

      queryClient.invalidateQueries(["authUser"]);

      if (user) dispatch(setUser(user));

      showSuccess("Password updated successfully!");
    },
    onError: (err) => {
      console.error(err);

      showError(err.message || "Failed to update password!");
    },
  });
}

export function useUpdateUsername() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.updateUsername,
    onSuccess: (data) => {
      const user = data?.data?.user;

      queryClient.invalidateQueries(["authUser"]);

      if (user) dispatch(setUser(user));

      showSuccess("Username updated successfully!");
    },
    onError: (err) => {
      console.error(err);

      showError(err.message || "Failed to update username!");
    },
  });
}

// Load current user
export function useAuthInit() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: api.getCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
