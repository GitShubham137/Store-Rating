import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    const userData = await authService.login(email, password, role);
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const register = async (name, email, password, address, role) => {
    const userData = await authService.register(name, email, password, address, role);
    // Optionally log in the user directly after registration
    // setUser(userData.data);
    // localStorage.setItem('user', JSON.stringify(userData.data));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
