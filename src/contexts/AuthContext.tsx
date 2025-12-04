import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "student" | "hirer" | "admin";

export interface User {
  id: string;
  idNumber?: string; // For students
  email?: string; // For hirers
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { idNumber?: string; email?: string; password: string; role: UserRole }) => boolean;
  signup: (data: { idNumber?: string; email?: string; name: string; password: string; role: UserRole }) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded users for prototype
const MOCK_USERS: User[] = [
  { id: "1", idNumber: "2024-0001", name: "Juan Dela Cruz", role: "student" },
  { id: "2", idNumber: "2024-0002", name: "Maria Santos", role: "student" },
  { id: "3", email: "hirer@msu.edu.ph", name: "HR Department", role: "hirer" },
  { id: "4", email: "admin@msu.edu.ph", name: "System Admin", role: "admin" },
];

// Hardcoded passwords (prototype only)
const MOCK_PASSWORDS: Record<string, string> = {
  "2024-0001": "student123",
  "2024-0002": "student123",
  "hirer@msu.edu.ph": "hirer123",
  "admin@msu.edu.ph": "admin123",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("msu_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (credentials: { idNumber?: string; email?: string; password: string; role: UserRole }): boolean => {
    const identifier = credentials.role === "student" ? credentials.idNumber : credentials.email;
    
    if (!identifier || !MOCK_PASSWORDS[identifier]) {
      return false;
    }
    
    if (MOCK_PASSWORDS[identifier] !== credentials.password) {
      return false;
    }

    const foundUser = MOCK_USERS.find(u => 
      (u.idNumber === identifier || u.email === identifier) && u.role === credentials.role
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("msu_user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const signup = (data: { idNumber?: string; email?: string; name: string; password: string; role: UserRole }): boolean => {
    // Prototype: just create a new user
    const newUser: User = {
      id: Date.now().toString(),
      idNumber: data.idNumber,
      email: data.email,
      name: data.name,
      role: data.role,
    };
    setUser(newUser);
    localStorage.setItem("msu_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("msu_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
