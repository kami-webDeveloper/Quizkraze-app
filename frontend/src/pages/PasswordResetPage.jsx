import { LockClosedIcon } from "@heroicons/react/24/outline";
import AuthFormLayout from "../components/auth/AuthFormlayout";
import InputField from "../components/auth/InputField";
import { useState } from "react";
import { useResetPassword } from "../hooks/useAuth";
import { useParams } from "react-router-dom";

export default function PasswordResetPage() {
  const { resetToken } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, passwordConfirm } = formData;

    if (!password || !passwordConfirm) return;
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }

    resetPassword({ resetToken, password, passwordConfirm });
  };

  return (
    <AuthFormLayout
      title="Password Reset"
      description="Enter a new password to reset your password"
      onSubmit={handleSubmit}
    >
      <InputField
        id="password"
        placeholder="New Password"
        icon={LockClosedIcon}
        isPassword
        value={formData.password}
        onChange={handleChange}
        minLength={8}
      />
      <InputField
        id="passwordConfirm"
        placeholder="Confirm Password"
        icon={LockClosedIcon}
        isPassword
        value={formData.passwordConfirm}
        onChange={handleChange}
        minLength={8}
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Resetting..." : "Reset Password"}
      </button>
    </AuthFormLayout>
  );
}
