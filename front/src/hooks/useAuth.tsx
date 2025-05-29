import { useContext } from "react";
import type { AuthContextType } from "../types";
import { AuthContext } from "../context/AuthContext";


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};