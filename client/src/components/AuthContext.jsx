import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get("/api/auth/verify-token", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAuthState({
            isAuthenticated: true,
            user: response.data.user,
            loading: false,
          });
        })
        .catch(() => {
          setAuthState({ isAuthenticated: false, user: null, loading: false });
        });
    } else {
      setAuthState({ isAuthenticated: false, user: null, loading: false });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setAuthState({ isAuthenticated: true, loading: false });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthState({ isAuthenticated: false, user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
