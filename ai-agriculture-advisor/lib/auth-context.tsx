"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: "farmer" | "expert";
  farmName?: string;
  avatar?: string;
}

// Define AuthContext type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  signup: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("agri_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data", error);
        localStorage.removeItem("agri_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Mock Login
  const login = async (email: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: "1",
      name: "Rajesh Kumar",
      email: email,
      role: "farmer",
      farmName: "Green Valley Farm",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    };

    setUser(mockUser);
    localStorage.setItem("agri_user", JSON.stringify(mockUser));
    setIsLoading(false);
    router.push("/dashboard");
  };

  // Mock Signup
  const signup = async (userData: Partial<User>) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || "New Farmer",
      email: userData.email || "",
      role: userData.role || "farmer",
      farmName: userData.farmName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
    };

    setUser(newUser);
    localStorage.setItem("agri_user", JSON.stringify(newUser));
    setIsLoading(false);
    router.push("/dashboard");
  };

  // Mock Logout
  const logout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem("agri_user");
    setIsLoading(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
