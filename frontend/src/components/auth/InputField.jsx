import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function InputField({
  id,
  type = "text",
  placeholder,
  icon: Icon,
  isPassword = false,
  value,
  onChange,
  minLength,
  maxLength,
}) {
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 dark:text-gray-500 left-3 top-1/2" />
      )}
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        className={`w-full py-2 ${Icon ? "pl-10" : "pl-4"} ${
          isPassword ? "pr-10" : "pr-4"
        } 
          bg-white dark:bg-gray-700 
          border border-gray-300 dark:border-gray-600 
          rounded-md 
          placeholder-gray-400 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          text-gray-900 dark:text-gray-100
        `}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute text-gray-400 -translate-y-1/2 dark:text-gray-400 right-3 top-1/2 hover:text-gray-600 dark:hover:text-gray-200"
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
}
