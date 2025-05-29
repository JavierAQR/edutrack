import { createContext } from "react";
import type { AuthContextType } from "../types";

// Creamos el contexto con tipo explícito
export const AuthContext = createContext<AuthContextType | undefined>(undefined);