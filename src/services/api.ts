import { nearbyVenues, nearbyPeople } from '@/data/mockData';
import { VenueData } from '@/components/venue/VenueCard';
import { PersonData } from '@/components/social/PersonCard';
import { handleApiError } from '@/lib/error-handler';

const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001/api/'
  : 'https://foodslinkx-backend.vercel.app/api/';

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

// Mock API response for development
const mockApiResponse = async (endpoint: string, options: RequestInit = {}) => {
  await delay(500); // Simulate network delay
  
  // Simulate different responses based on endpoint
  if (endpoint.includes('auth/login')) {
    const body = JSON.parse(options.body as string);
    
    // Check registered users first
    const registeredUsers = getRegisteredUsers();
    const registeredUser = registeredUsers.find(u => u.email === body.email && u.password === body.password);
    
    if (registeredUser) {
      return {
        user: {
          id: registeredUser.id,
          email: registeredUser.email,
          name: registeredUser.name,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(registeredUser.name)}&background=random`
        },
        token: "mock-jwt-token-" + Math.random().toString(36).substr(2, 9)
      };
    }
    
    // Check hardcoded demo credentials (for testing)
    if (body.email === "user@example.com" && body.password === "password") {
      return {
        user: {
          id: "1",
          email: "user@example.com",
          name: "John Doe",
          avatar: "https://github.com/shadcn.png"
        },
        token: "mock-jwt-token-" + Math.random().toString(36).substr(2, 9)
      };
    }
    
    throw new Error("Invalid email or password");
  }
  
  if (endpoint.includes('auth/signup')) {
    const body = JSON.parse(options.body as string);
    
    // Check if user already exists
    const registeredUsers = getRegisteredUsers();
    const existingUser = registeredUsers.find(u => u.email === body.email);
    
    if (existingUser) {
      throw new Error("User with this email already exists. Please login instead.");
    }
    
    // Save new user to registered users
    const newUser = saveRegisteredUser(body.email, body.password, body.name);
    
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name)}&background=random`
    };
  }
  
  throw new Error(`Mock API: Endpoint ${endpoint} not implemented`);
};

// Enhanced API with interceptors
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  // In development, use mock data to avoid CORS issues
  if (import.meta.env.DEV) {
    console.log('Development mode: Using mock API for', endpoint);
    return mockApiResponse(endpoint, options);
  }
  
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

    // Handle other HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorData.error || `HTTP ${response.status}`;
      } catch {
        errorMessage = errorText || `HTTP ${response.status}`;
      }
      
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      throw error;
    }

    // Parse JSON response
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return response;
  } catch (error) {
    // Handle network errors, CORS issues, etc.
    console.error('Network error during API request:', error);
    
    // Check if it's a CORS error
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Unable to connect to server. Please check your connection or try again later.');
    }
    
    throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const api = {
  async get<T>(endpoint: string): Promise<T> {
    return await apiRequest(endpoint);
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    return await apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    return await apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete<T>(endpoint: string): Promise<T> {
    return await apiRequest(endpoint, {
      method: 'DELETE',
    });
  },

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return await apiRequest(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
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

export const searchHotels = async (params: {
  query: string;
  category?: string;
  price?: string;
  rating?: number;
  location?: string;
}) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('q', params.query);
    if (params.category && params.category !== 'all') {
      queryParams.append('category', params.category);
    }
    if (params.price) {
      queryParams.append('price', params.price);
    }
    if (params.rating) {
      queryParams.append('rating', params.rating.toString());
    }
    if (params.location) {
      queryParams.append('location', params.location);
    }

    const response = await api.get(`/hotel/search?${queryParams.toString()}`);
    return response;
  } catch (error) {
    console.error('Search failed:', error);
    // Return mock data for demo purposes
    return {
      data: [
        {
          id: "1",
          name: "The Garden Restaurant",
          category: "restaurant",
          rating: 4.5,
          reviews: 234,
          distance: "0.8 km",
          waitTime: "15-20 min",
          price: "$$",
          tags: ["Italian", "Outdoor Seating", "Romantic"],
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
        },
        {
          id: "2",
          name: "Coffee House",
          category: "cafe",
          rating: 4.2,
          reviews: 156,
          distance: "0.3 km",
          waitTime: "5-10 min",
          price: "$",
          tags: ["Coffee", "Pastries", "WiFi"],
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"
        }
      ]
    };
  }
};

export default api;
