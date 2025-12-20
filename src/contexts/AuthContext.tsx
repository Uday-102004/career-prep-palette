import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin credentials
const ADMIN_USERNAME = 'udaykumar';
const ADMIN_PASSWORD = 'Uday@help';

// Mock user storage (will be replaced with Supabase)
const mockUsers: { email: string; password: string }[] = [];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, isAdmin = false): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (isAdmin) {
      if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setUser({ id: 'admin-1', email: 'admin@prepmaster.com', role: 'admin' });
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    }
    
    // Check mock users
    const existingUser = mockUsers.find(u => u.email === email && u.password === password);
    if (existingUser) {
      setUser({ id: `user-${Date.now()}`, email, role: 'user' });
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      setIsLoading(false);
      return false;
    }
    
    mockUsers.push({ email, password });
    setUser({ id: `user-${Date.now()}`, email, role: 'user' });
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
