import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAdmin(userData.isAdmin || false);
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
    if (user) {
      setUser({ ...user, isAdmin: !isAdmin });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, toggleAdmin }}>
      {children}
    </AuthContext.Provider>
  );

  
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }
  return context;
};
