declare type UserType = "STUDENT" | "TEACHER" | "PARENT" | "ADMIN" | "SUPER_ADMIN";

// Definimos la interfaz para el contexto de autenticación
export interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isloading: boolean;
  }

  export interface User {
    // id: string,
    // email: string,
    // lastname: string,
    // name: string,
    username: string,
    // user_type: UserType
  }