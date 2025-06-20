import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoginController } from '../../controllers/loginController';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const authStatus = await LoginController.checkAuthentication();
      
      if (authStatus.isAuthenticated) {
        setUser(authStatus.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await LoginController.handleLogin(credentials);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Login failed'
      };
    }
  };

  const logout = async () => {
    try {
      const response = await LoginController.handleLogout();
      setUser(null);
      setIsAuthenticated(false);
      return response;
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local state even if logout fails
      setUser(null);
      setIsAuthenticated(false);
      return {
        success: false,
        error: 'Logout failed'
      };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;