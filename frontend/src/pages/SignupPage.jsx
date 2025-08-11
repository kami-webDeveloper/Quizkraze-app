import { useState } from "react";
import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import AuthFormLayout from "../components/auth/AuthFormlayout";
import InputField from "../components/auth/InputField"; // Adjust path if needed
import { useSignup } from "../hooks/useAuth";
import Spinner from "../ui/Spinner";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { mutate: signup, isPending, isError, error } = useSignup();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    signup(formData);
  };

  return (
    <AuthFormLayout
      title="Sign Up"
      description="Create your account to get started with QuizKraze"
      onSubmit={handleSubmit}
    >
      <InputField
        id="username"
        type="text"
        placeholder="Username"
        icon={UserIcon}
        value={formData.username}
        onChange={handleChange}
        minLength={8}
        maxLength={60}
      />

      <InputField
        id="email"
        type="email"
        placeholder="Email"
        icon={EnvelopeIcon}
        value={formData.email}
        onChange={handleChange}
        minLength={8}
        maxLength={128}
      />

      <InputField
        id="password"
        type="password"
        placeholder="••••••••"
        icon={LockClosedIcon}
        isPassword
        value={formData.password}
        onChange={handleChange}
      />

      <InputField
        id="passwordConfirm"
        type="password"
        placeholder="••••••••"
        icon={LockClosedIcon}
        isPassword
        value={formData.passwordConfirm}
        onChange={handleChange}
      />

      <button
        className={`w-full py-2 space-x-3 font-semibold text-white transition  rounded-md  ${
          isPending
            ? "bg-blue-400 hover:bg-none"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        type="submit"
        disabled={isPending}
      >
        <span>{isPending ? "Signing up" : "Sign Up"}</span>
        {isPending && <Spinner size={4} />}
      </button>

      <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
        Already have an account?
        <Link
          to="/auth/login"
          className="ml-1 font-medium text-black underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Login here
        </Link>
      </p>
    </AuthFormLayout>
  );
}
