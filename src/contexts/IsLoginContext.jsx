import React, { createContext, useContext, useState, useMemo } from "react";

const userId = localStorage.getItem("token");
const token = localStorage.getItem("token");

export const IsLoginContext = createContext({
  isLogin: userId !== null && token !== null ? true : false,
});

export function IsLoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(
    userId !== null && token !== null ? true : false
  );

  const value = useMemo(() => ({ isLogin, setIsLogin }), [isLogin, setIsLogin]);

  return (
    <IsLoginContext.Provider value={value}>{children}</IsLoginContext.Provider>
  );
}

export function useIsLoginState() {
  const context = useContext(IsLoginContext);

  if (!context) {
    throw new Error("Cannot found IsLoginProvider");
  }

  return context.isLogin;
}
