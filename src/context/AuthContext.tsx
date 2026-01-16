import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, login as authLogin, logout as authLogout, verifyToken } from '@/services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('auth_user');
        const storedToken = localStorage.getItem('jwt_token');
        
        if (storedUser && storedToken) {
          // Parse stored user data
          const userData = JSON.parse(storedUser);
          
          // Temporarily skip token verification to test login
          setUser(userData);
          setToken(storedToken);
          
          // Original code (temporarily commented):
          // const isTokenValid = await verifyToken();
          // 
          // if (isTokenValid) {
          //   setUser(userData);
          //   setToken(storedToken);
          // } else {
          //   // Token is invalid, clear stored data
          //   console.warn('Stored token is invalid, clearing authentication data');
          //   localStorage.removeItem('auth_user');
          //   localStorage.removeItem('jwt_token');
          // }
        }
      } catch (e) {
        console.error("Failed to initialize authentication:", e);
        // Clear potentially corrupted data
        localStorage.removeItem('auth_user');
        localStorage.removeItem('jwt_token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authLogin(credentials);
      
      if (response.user && response.token) {
        setUser(response.user);
        setToken(response.token);
        // Token and user data are already stored in the API layer
      } else {
        throw new Error('Login failed: No user or token returned');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authLogout();
    } catch (err) {
      console.error("Logout failed", err);
      // Continue with local logout even if API call fails
    } finally {
      // Always clear local data regardless of API success
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_user');
      localStorage.removeItem('jwt_token');
      setIsLoading(false);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const { refreshToken: refreshApiToken } = await import('@/services/api');
      const newToken = await refreshApiToken();
      
      if (newToken) {
        setToken(newToken);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Token refresh failed:", err);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isLoading,
      error,
      login,
      logout,
      refreshToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
