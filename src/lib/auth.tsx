"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  register: () => {},
  logout: () => {},
});

const DEFAULT_USER: UserProfile = {
  name: 'Alex Smith',
  email: 'alex.smith@aura.fi',
  avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent',
  role: 'Admin & Founder',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('aura_user');
    const savedAuth = localStorage.getItem('aura_auth');
    if (savedUser && savedAuth === 'true') {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch (e) {
        setUser(DEFAULT_USER);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      name: name || email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(email)}&backgroundColor=transparent`,
      role: 'Member',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('aura_user', JSON.stringify(newUser));
    localStorage.setItem('aura_auth', 'true');
  };

  const register = (name: string, email: string) => {
    const newUser: UserProfile = {
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(name)}&backgroundColor=transparent`,
      role: 'Owner',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('aura_user', JSON.stringify(newUser));
    localStorage.setItem('aura_auth', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('aura_user');
    localStorage.removeItem('aura_auth');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
