import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType, User } from "../types";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isloading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  const value: AuthContextType = { user, login, logout, isloading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};