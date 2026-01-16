import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
<<<<<<< HEAD
import { User, LoginCredentials, login as authLogin, logout as authLogout, verifyToken } from '@/services/api';
=======
import { User, LoginCredentials, login as authLogin, logout as authLogout } from '@/services/auth';
>>>>>>> 6d5d7b28d0faeb8de253a4d87fcbe1b6bc9f08be

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
<<<<<<< HEAD
  refreshToken: () => Promise<boolean>;
=======
>>>>>>> 6d5d7b28d0faeb8de253a4d87fcbe1b6bc9f08be
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
<<<<<<< HEAD
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
=======
    const storedUser = localStorage.getItem('auth_user');
    const storedToken = localStorage.getItem('jwt_token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('jwt_token');
      }
    }
    setIsLoading(false);
>>>>>>> 6d5d7b28d0faeb8de253a4d87fcbe1b6bc9f08be
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
<<<<<<< HEAD
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
=======
      const res = await fetch("https://foodslinkx-backend.vercel.app/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(credentials)
      })
      const data = await res.json();
      const userData = data?.data?.user;
      const userToken = data?.data?.token;

      if (userData && userToken) {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        localStorage.setItem('jwt_token', userToken);
      } else {
        throw new Error(data.message || 'Login failed: No user or token returned');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
>>>>>>> 6d5d7b28d0faeb8de253a4d87fcbe1b6bc9f08be
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authLogout();
<<<<<<< HEAD
    } catch (err) {
      console.error("Logout failed", err);
      // Continue with local logout even if API call fails
    } finally {
      // Always clear local data regardless of API success
=======
>>>>>>> 6d5d7b28d0faeb8de253a4d87fcbe1b6bc9f08be
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_user');
      localStorage.removeItem('jwt_token');
<<<<<<< HEAD
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
=======
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setIsLoading(false);
>>>>>>> 6d5d7b28d0faeb8de253a4d87fcbe1b6bc9f08be
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
<<<<<<< HEAD
      logout,
      refreshToken
=======
      logout
>>>>>>> 6d5d7b28d0faeb8de253a4d87fcbe1b6bc9f08be
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
