/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#2563EB",
        accent: "#22C55E",
        lightBackground: "#F9FAFB",
        textGray: "#1F2937",
      },
    },
  },
  plugins: [],
};
