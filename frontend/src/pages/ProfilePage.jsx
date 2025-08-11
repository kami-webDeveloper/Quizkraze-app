import { useState, useMemo } from "react";
import {
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  useLogout,
  useUpdatePassword,
  useUpdateUsername,
} from "../hooks/useAuth";
import { useSelector } from "react-redux";

function InputWithIcon({
  icon: Icon,
  id,
  label,
  type,
  value,
  name,
  onChange,
  error,
  placeholder,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div
        className={`relative flex items-center rounded-md border px-4 py-3 bg-white dark:bg-gray-700 transition
          ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
          focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400`}
      >
        <Icon className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-300" />
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full text-base text-gray-900 bg-transparent outline-none sm:text-lg dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400"
          minLength={8}
          required
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user);

  const [editUsername, setEditUsername] = useState(user.username);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});

  const { mutate: updateUsername, isPending: isUpdatingUsername } =
    useUpdateUsername();

  const { mutate: updatePassword, isPending: isUpdatingPassword } =
    useUpdatePassword();

  const { mutate: logout } = useLogout();

  function handleUsernameChange(e) {
    setEditUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function validatePasswordForm() {
    const errs = {};
    if (!passwords.current.trim()) errs.current = "Current password required";
    if (!passwords.new.trim()) errs.new = "New password required";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/.test(
        passwords.new
      )
    )
      errs.new =
        "Password must include uppercase, lowercase, number & special char";
    if (passwords.new !== passwords.confirm)
      errs.confirm = "Passwords do not match";

    return errs;
  }

  function handleUsernameSubmit(e) {
    e.preventDefault();

    if (editUsername.length < 8 || editUsername.length > 70) {
      setErrors({ username: "Username must be 8-70 characters" });
      return;
    }

    setErrors({});
    updateUsername({ username: editUsername });
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    const errs = validatePasswordForm();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});

    updatePassword({
      passwordCurrent: passwords.current,
      password: passwords.new,
      passwordConfirm: passwords.confirm,
    });

    setPasswords({ current: "", new: "", confirm: "" });
  }

  // Disable logic for buttons
  const isUsernameChanged = useMemo(
    () => editUsername.trim() !== user.username,
    [editUsername, user.username]
  );

  const isPasswordFormFilled = useMemo(
    () => passwords.current || passwords.new || passwords.confirm,
    [passwords]
  );

  return (
    <div className="relative min-h-screen px-4 py-10 text-gray-900 transition-colors bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      {/* Logout */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => logout()}
          className="p-3 text-red-500 transition rounded-ful hover:text-red-600 dark:hover:text-red-600"
          title="Logout"
        >
          <ArrowRightOnRectangleIcon className="w-7 h-7" />
        </button>
      </div>

      <h1 className="mb-16 text-4xl font-extrabold text-center text-blue-700 dark:text-blue-400">
        Your Profile
      </h1>

      {/* User Info Card */}
      <section className="flex flex-col items-center max-w-4xl gap-8 p-8 mx-auto bg-gray-100 shadow-md dark:bg-gray-800 dark:shadow-md dark:shadow-black/10 rounded-2xl md:flex-row md:gap-14">
        <form
          onSubmit={handleUsernameSubmit}
          className="flex-1 w-full max-w-md space-y-6"
        >
          <label
            htmlFor="username"
            className="block text-base font-semibold text-gray-700 dark:text-gray-300"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={editUsername}
            onChange={handleUsernameChange}
            className={`w-full rounded-md border px-4 py-3 text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition ${
              errors.username
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            minLength={8}
            maxLength={70}
            required
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username}</p>
          )}

          <label className="block text-base font-semibold text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-4 py-3 text-gray-500 bg-gray-200 border border-gray-300 rounded-md cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
          />

          <button
            type="submit"
            disabled={!isUsernameChanged || isUpdatingUsername}
            className={`w-full px-6 py-3 mt-4 font-semibold text-white transition rounded-md shadow-md ${
              !isUsernameChanged || isUpdatingUsername
                ? "bg-gray-300 cursor-not-allowed dark:bg-gray-700"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            }`}
          >
            {isUpdatingUsername ? "Changing username..." : "Save Username"}
          </button>
        </form>
      </section>

      {/* Password Card */}
      <section className="max-w-4xl p-8 mx-auto bg-gray-100 shadow-md mt-14 dark:bg-gray-800 dark:shadow-md dark:shadow-black/10 rounded-2xl">
        <h2 className="mb-8 text-3xl font-bold text-center text-blue-700 dark:text-blue-400">
          Change Password
        </h2>

        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <InputWithIcon
            id="currentPassword"
            name="current"
            label="Current Password"
            type="password"
            value={passwords.current}
            onChange={handlePasswordChange}
            placeholder="Enter current password"
            error={errors.current}
            icon={LockClosedIcon}
            autoComplete="current-password"
          />
          <InputWithIcon
            id="newPassword"
            name="new"
            label="New Password"
            type="password"
            value={passwords.new}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
            error={errors.new}
            icon={LockClosedIcon}
            autoComplete="new-password"
          />
          <InputWithIcon
            id="confirmPassword"
            name="confirm"
            label="Confirm New Password"
            type="password"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            placeholder="Confirm new password"
            error={errors.confirm}
            icon={LockClosedIcon}
            autoComplete="new-password"
          />

          <button
            type="submit"
            disabled={!isPasswordFormFilled || isUpdatingPassword}
            className={`w-full px-6 py-3 text-lg font-semibold text-white transition rounded-md shadow-md ${
              !isPasswordFormFilled || isUpdatingPassword
                ? "bg-gray-300 cursor-not-allowed dark:bg-gray-700"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            }`}
          >
            {isUpdatingPassword ? "Updating password..." : "Update Password"}
          </button>
        </form>
      </section>
    </div>
  );
}
