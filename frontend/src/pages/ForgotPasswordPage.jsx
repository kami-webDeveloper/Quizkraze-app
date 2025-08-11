import { EnvelopeIcon } from "@heroicons/react/24/outline";
import AuthFormLayout from "../components/auth/AuthFormlayout";
import InputField from "../components/auth/InputField";
import { useForgotPassword } from "../hooks/useAuth";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({ email: "" });

  const { mutate: sendResetEmail, isPending } = useForgotPassword();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) return;

    sendResetEmail({ email: formData.email });
  };

  return (
    <AuthFormLayout
      title="Password Reset Request"
      description="Enter the email address of your account to send an email for password reset"
      onSubmit={handleSubmit}
    >
      <InputField
        id="email"
        type="email"
        placeholder="Email"
        icon={EnvelopeIcon}
        value={formData.email}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
      >
        {isPending ? "Sending..." : "Send Request"}
      </button>
    </AuthFormLayout>
  );
}
