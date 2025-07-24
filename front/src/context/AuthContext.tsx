import React, { createContext, useContext, useEffect, useState } from 'react';


// src/types.ts
export interface Institution {
  id: number;
  name: string;
  // otras propiedades según tu entidad
}

export interface Grade {
  id: number;
  name: string;
  academicLevel?: {
    id: number;
    name: string;
  };
}

export interface StudentProfile {
  id: number;
  biography?: string;
  grade?: Grade;
  user?: User; // referencia circular opcional
}

export interface TeacherProfile {
  id: number;
  title: string;
  specialization: string;
  yearsExperience: number;
  biography?: string;
  cvUrl?: string;
  user?: User; // referencia circular opcional
}

export enum UserType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  PARENT = "PARENT",
  INSTITUTION_ADMIN = "INSTITUTION_ADMIN",
  ADMIN = "ADMIN"
}

export interface User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  birthdate: string; // o Date si haces transformación
  enabled: boolean;
  institution?: Institution;
  userType: UserType;
  studentProfile?: StudentProfile;
  teacherProfile?: TeacherProfile;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isloading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

























const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isloading, setIsLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
      }, []);

    const login = (newToken: string, userData: User) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setToken(newToken);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem('token');
        window.location.href = "/login";
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{  token, login, logout, isloading, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};