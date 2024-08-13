"use client";
import { createContext, useState, useContext, useEffect, use } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    login();
  }, []);

  const login = () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          setIsAuthenticated(false);
          setUser({ id: null, name: null, image: null });
          localStorage.removeItem("token");
        } else {
          setIsAuthenticated(true);
          setUser({
            id: decodedToken.id,
            name: decodedToken.name,
            image: decodedToken.image,
            role: decodedToken.role,
            vendorId: decodedToken.vendorId,
          });
        }
      } else {
        setIsAuthenticated(false);
        setUser({});
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({});
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, user, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
