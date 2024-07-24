import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("n.shop-user-info")) || null
  );
  const [activeLink, setActiveLink] = useState("/home");
  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, activeLink, setActiveLink }}
    >
      {children}
    </AuthContext.Provider>
  );
};
