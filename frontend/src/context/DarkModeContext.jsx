import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <DarkModeContext.Provider
      value={{ isDark, toggle: () => setIsDark((d) => !d) }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
