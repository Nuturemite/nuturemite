"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ id: null, name: null, image: null, role: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
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
            id: decodedToken._id,
            name: decodedToken.name,
            image: decodedToken.image,
            role: decodedToken.role,
            vendorId: decodedToken.vendorId,
          });
        }
      } else {
        setIsAuthenticated(false);
        setUser({ id: null, name: null, image: null, role: null, vendorId: null });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({ id: null, name: null, image: null, role: null, vendorId: null });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
