import { createContext, useContext, useState } from "react";

const LayoutUIContext = createContext();

export function LayoutUIProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <LayoutUIContext.Provider
      value={{ searchTerm, setSearchTerm, isSearchOpen, setIsSearchOpen }}
    >
      {children}
    </LayoutUIContext.Provider>
  );
}

export function UseLayoutUI() {
  const context = useContext(LayoutUIContext);
  if (!context)
    throw new Error("useLayoutUI must be used within LayoutUIProvider");
  return context;
}
