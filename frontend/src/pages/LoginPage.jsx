import { useState } from "react";
import { Link } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import AuthFormLayout from "../components/auth/AuthFormlayout";
import InputField from "../components/auth/InputField";
import { useLogin } from "../hooks/useAuth";
import Spinner from "../ui/Spinner";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate: login, isPending } = useLogin();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) return;

    login(formData);
  };

  return (
    <AuthFormLayout title="Login" onSubmit={handleSubmit}>
      <InputField
        id="email"
        type="email"
        placeholder="Email"
        icon={EnvelopeIcon}
        value={formData.email}
        onChange={handleChange}
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

      <div className="text-right">
        <Link
          to="/auth/forgot-password"
          className="text-sm font-medium text-black underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Forgot password?
        </Link>
      </div>

      <button
        className={`w-full py-2 space-x-3 font-semibold text-white transition  rounded-md  ${
          isPending
            ? "bg-blue-400 hover:bg-none"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        type="submit"
        disabled={isPending}
      >
        <span>{isPending ? "Logging in" : "Login"}</span>
        {isPending && <Spinner size={4} />}
      </button>

      <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
        No accounts?
        <Link
          to="/auth/signup"
          className="ml-1 font-medium text-black underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Signup
        </Link>
      </p>
    </AuthFormLayout>
  );
}
