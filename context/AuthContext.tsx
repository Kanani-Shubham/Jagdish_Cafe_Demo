
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockAuth } from '../services/mockFirebase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = mockAuth.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (data: any) => {
    const user = await mockAuth.signIn(data.email, data.password);
    setUser(user);
  };

  const signup = async (data: any) => {
    const user = await mockAuth.signUp(data);
    setUser(user);
  };

  const logout = async () => {
    await mockAuth.signOut();
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
