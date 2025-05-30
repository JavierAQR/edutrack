declare type UserType = "STUDENT" | "TEACHER" | "PARENT" | "ADMIN" | "SUPER_ADMIN";

export interface User {
    username: string,
    // user_type: UserType
}

export interface Usuario {
    id: number;
    username: string;
    email: string;
    userType: string;
  }

  interface AuthContextType {
    token: string | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
    isloading: boolean;
    user: User | null;
}

export interface Course {
    id: number;
    name: string;
    teacherName: string;
    period: string;
}

export interface Activity {
    id: number;
    title: string;
    completed: boolean;
    courseName: string;
    dueDate: string;
}