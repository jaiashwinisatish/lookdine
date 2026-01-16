import { nearbyVenues, nearbyPeople } from '@/data/mockData';
import { VenueData } from '@/components/venue/VenueCard';
import { PersonData } from '@/components/social/PersonCard';

const API_BASE_URL = 'https://foodslinkx-backend.vercel.app/api';

const getAuthToken = () => {
  return localStorage.getItem('jwt_token');
};

const setAuthToken = (token: string) => {
  localStorage.setItem('jwt_token', token);
};

const clearAuthToken = () => {
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('auth_user');
};

// Global error handler for 401 responses
const handleUnauthorized = () => {
  clearAuthToken();
  // Redirect to login page
  if (window.location.pathname !== '/auth/login') {
    window.location.href = '/auth/login';
  }
};

// Enhanced API with interceptors
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    });

    // Handle 401 Unauthorized globally
    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Session expired. Please login again.');
    }

    return response;
  } catch (error) {
    // Handle network errors, CORS issues, etc.
    console.error('Network error during API request:', error);
    throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await apiRequest(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to post: ${response.statusText} (${response.status})`);
      }
      return response.json();
    } catch (error) {
      // Log the error but don't throw - let the calling function handle fallback
      console.warn('API POST failed, will use mock fallback:', error);
      throw error;
    }
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to put: ${response.statusText}`);
    }
    return response.json();
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await apiRequest(endpoint, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.statusText}`);
    }
    return response.json();
  },

  async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await apiRequest(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to patch: ${response.statusText}`);
    }
    return response.json();
  },
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const fetchVenues = async (): Promise<VenueData[]> => {
  return nearbyVenues;
};

export const fetchPeople = async (): Promise<PersonData[]> => {
  return nearbyPeople;
};

export const fetchChatStatus = async (): Promise<{ cleared: string[], deleted: string[] }> => {
  await delay(300);
  const cleared = JSON.parse(localStorage.getItem('clearedChats') || '[]');
  const deleted = JSON.parse(localStorage.getItem('deletedChats') || '[]');
  return { cleared, deleted };
};

export const clearChat = async (chatId: string): Promise<void> => {
  await delay(300);
  const cleared = JSON.parse(localStorage.getItem('clearedChats') || '[]');
  if (!cleared.includes(chatId)) {
    cleared.push(chatId);
    localStorage.setItem('clearedChats', JSON.stringify(cleared));
  }
};

export const deleteChat = async (chatId: string): Promise<void> => {
  await delay(300);
  const deleted = JSON.parse(localStorage.getItem('deletedChats') || '[]');
  if (!deleted.includes(chatId)) {
    deleted.push(chatId);
    localStorage.setItem('deletedChats', JSON.stringify(deleted));
  }
};

export const signup = async (data: SignupData): Promise<User> => {
  try {
    const response = await api.post<LoginResponse>('auth/signup', data);
    
    // Auto-login after successful signup
    if (response.user && response.token) {
      setAuthToken(response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
    }
    
    return response.user;
  } catch (error) {
    // Fallback to mock signup if API fails (including 500 errors)
    console.warn('API signup failed (500 or network error), using mock fallback:', error);
    await delay(1500);

    if (!data.email || !data.password || !data.name) {
      throw new Error("Missing required fields");
    }

    // Check if user already exists
    const registeredUsers = getRegisteredUsers();
    const existingUser = registeredUsers.find(u => u.email === data.email);
    
    if (existingUser) {
      throw new Error("User with this email already exists. Please login instead.");
    }

    // Create new user and save to registered users
    const newUser = saveRegisteredUser(data.email, data.password, data.name);

    const mockUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: data.phone,
      address: data.address,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name)}&background=random`
    };

    // Auto-login after successful signup
    const mockResponse: LoginResponse = {
      user: mockUser,
      token: "mock-jwt-token-" + Math.random().toString(36).substr(2, 9)
    };
    
    setAuthToken(mockResponse.token);
    localStorage.setItem('auth_user', JSON.stringify(mockResponse.user));

    return mockUser;
  }
};

// Store registered users in localStorage for demo purposes
const getRegisteredUsers = (): Array<{email: string, password: string, name: string, id: string}> => {
  const users = localStorage.getItem('registered_users');
  return users ? JSON.parse(users) : [];
};

const saveRegisteredUser = (email: string, password: string, name: string) => {
  const users = getRegisteredUsers();
  const newUser = {
    id: "user-" + Math.random().toString(36).substr(2, 9),
    email,
    password,
    name
  };
  users.push(newUser);
  localStorage.setItem('registered_users', JSON.stringify(users));
  return newUser;
};

export const login = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('auth/login', credentials);
    
    // Store token and user data
    if (response.user && response.token) {
      setAuthToken(response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
    }
    
    return response;
  } catch (error) {
    // Fallback to mock login if API fails (including 500 errors)
    console.warn('API login failed (500 or network error), using mock fallback:', error);
    await delay(800);

    // Check registered users first
    const registeredUsers = getRegisteredUsers();
    const registeredUser = registeredUsers.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (registeredUser) {
      const mockResponse: LoginResponse = {
        user: {
          id: registeredUser.id,
          email: registeredUser.email,
          name: registeredUser.name,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(registeredUser.name)}&background=random`
        },
        token: "mock-jwt-token-" + Math.random().toString(36).substr(2, 9)
      };
      
      setAuthToken(mockResponse.token);
      localStorage.setItem('auth_user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }

    // Check hardcoded demo credentials (for testing)
    if (credentials.email === "user@example.com" && credentials.password === "password") {
      const mockResponse: LoginResponse = {
        user: {
          id: "1",
          email: "user@example.com",
          name: "John Doe",
          avatar: "https://github.com/shadcn.png"
        },
        token: "mock-jwt-token-" + Math.random().toString(36).substr(2, 9)
      };
      
      setAuthToken(mockResponse.token);
      localStorage.setItem('auth_user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }

    if (credentials.email === "admin@example.com" && credentials.password === "admin") {
      const mockResponse: LoginResponse = {
        user: {
          id: "2",
          email: "admin@example.com",
          name: "Admin User",
          avatar: "https://github.com/shadcn.png"
        },
        token: "mock-jwt-token-" + Math.random().toString(36).substr(2, 9)
      };
      
      setAuthToken(mockResponse.token);
      localStorage.setItem('auth_user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }

    throw new Error("Invalid email or password. Please sign up first or check your credentials.");
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('auth/logout', {});
  } catch (error) {
    console.warn('API logout failed, clearing local data:', error);
  } finally {
    clearAuthToken();
  }
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await api.post<{ token: string }>('auth/refresh', {});
    if (response.token) {
      setAuthToken(response.token);
      return response.token;
    }
    return null;
  } catch (error) {
    console.warn('Token refresh failed:', error);
    handleUnauthorized();
    return null;
  }
};

export const verifyToken = async (): Promise<boolean> => {
  try {
    const response = await api.get<{ valid: boolean }>('auth/verify');
    return response.valid;
  } catch (error) {
    console.warn('Token verification failed:', error);
    return false;
  }
};

export default api;
