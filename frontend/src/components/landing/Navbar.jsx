import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "../app/DarkModeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Categories", href: "#categories" },
    { label: "Features", href: "#features" },
    { label: "Testimonial", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 transition-colors duration-300 bg-white shadow-md dark:bg-gray-900">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-10">
          {/* Logo + Nav Links */}
          <div className="items-center hidden gap-10 md:flex">
            <h1 className="text-2xl font-bold tracking-wide text-blue-600 uppercase dark:text-blue-400 sm:text-3xl">
              <a href="#">QUIZKRAZE</a>
            </h1>
            <nav className="flex gap-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="font-medium text-gray-700 transition dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Login/Signup Buttons (Desktop) */}
          <div className="items-center hidden gap-4 md:flex">
            <DarkModeToggle />
            <NavLink
              to="/auth/login"
              className="border border-green-500 text-green-500 bg-[#F9FAFB] dark:bg-gray-800 dark:text-green-400 dark:border-green-400 px-4 py-2 rounded-md hover:bg-green-50 dark:hover:bg-gray-700 transition"
            >
              Login
            </NavLink>
            <NavLink
              to="/auth/signup"
              className="bg-blue-600 text-[#F9FAFB] px-4 py-2 rounded-md hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Sign Up
            </NavLink>
          </div>

          {/* Logo on Mobile */}
          <h1 className="text-2xl font-bold tracking-wide text-blue-600 uppercase dark:text-blue-400 md:hidden">
            <a href="#">QUIZKRAZE</a>
          </h1>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-300 md:hidden focus:outline-none z-[60]"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Blur Background When Menu is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-[64px] left-0 w-full z-50 md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 transition-colors duration-300 bg-white border-t border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <div className="flex gap-3 pt-4">
            <Link
              to="/auth/login"
              className="w-full text-center border border-green-500 text-green-500 bg-[#F9FAFB] dark:bg-gray-800 dark:text-green-400 dark:border-green-400 px-4 py-2 rounded-md hover:bg-green-50 dark:hover:bg-gray-700 transition"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="w-full text-center bg-blue-600 dark:bg-blue-500 text-[#F9FAFB] px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
