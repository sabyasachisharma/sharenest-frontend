import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, AuthState } from '../types';
import api from '../services/api';
import { cookieUtils } from '../utils/cookies';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  fetchUserData: () => Promise<boolean>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'tenant' | 'landlord';
  phone: string;
  bio: string;
}

interface AuthResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
  success: boolean;
}

interface LoginResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: {
    id: string;
    email: string;
    role: 'tenant' | 'landlord';
    firstName: string;
    lastName: string;
    profileImage: string | null;
    phoneNumber: string;
    bio: string;
  };
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: 'tenant' | 'landlord';
    firstName: string;
    lastName: string;
    profileImage: string | null;
    phoneNumber: string;
    bio: string;
  };
}

const initialState: AuthState = {
  user: null,
  token: cookieUtils.getAccessToken() || null,
  isAuthenticated: cookieUtils.isAuthenticated(), // Use the cookie check immediately
  isLoading: false, // Never start with loading for navbar
  error: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
  fetchUserData: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    const loadUser = async () => {
      const accessToken = cookieUtils.getAccessToken();
      
      if (!accessToken) {
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        return;
      }

      // If we have an access token, set the user as authenticated
      // User data will be loaded lazily when needed
      api.setAuthToken(accessToken);
      
      setAuthState(prev => ({
        ...prev,
        token: accessToken,
        isAuthenticated: true,
        isLoading: false,
      }));
    };

    loadUser();
  }, []);

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = cookieUtils.getRefreshToken();
      if (!refreshTokenValue) {
        return false;
      }

      const response = await api.post('/auth/refresh-token', { 
        refreshToken: refreshTokenValue 
      });

      if (response && (response as any).accessToken) {
        const { accessToken, refreshToken: newRefreshToken, user } = response as any;
        
        cookieUtils.setAuthTokens(accessToken, newRefreshToken, user?.id);
        api.setAuthToken(accessToken);
        
        setAuthState(prev => ({
          ...prev,
          user: user ? {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user.profileImage,
            phoneNumber: user.phoneNumber,
            bio: user.bio,
          } : prev.user,
          token: accessToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      
      // If refresh token is invalid, clear all auth data and logout
      cookieUtils.clearAuthTokens();
      api.setAuthToken(null);
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Only set loading for login operation, not for navbar
      setAuthState(prev => ({ ...prev, error: null }));
      
      const response = await api.post('/auth/login', { email, password });
      
      if (response && (response as any).success && (response as any).user) {
        const { accessToken, refreshToken, user } = response as any;
        
        cookieUtils.setAuthTokens(accessToken, refreshToken, user.id);
        api.setAuthToken(accessToken);
        
        setAuthState({
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user.profileImage,
            phoneNumber: user.phoneNumber,
            bio: user.bio,
          },
          token: accessToken,
          isAuthenticated: true,
          isLoading: false, // Never loading
          error: null,
        });
      } else {
        throw new Error('Invalid response structure from login API');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.response?.data?.message || error.message || 'Login failed. Please try again.',
      }));
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await api.post('/auth/register', userData);
      
      // Handle the actual response structure - API interceptor extracts data
      if (response && (response as any).message === "Registration successful." && (response as any).user) {
        const { user } = response as any;
        
        setAuthState({
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            profileImage: user.profileImage,
            phoneNumber: user.phoneNumber,
            bio: user.bio,
          },
          token: null,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('Registration failed - invalid response');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.response?.data?.message || error.message || 'Registration failed. Please try again.',
      }));
      throw error;
    }
  };

  const logout = () => {
    cookieUtils.clearAuthTokens();
    api.setAuthToken(null);
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      // Don't set loading state for profile updates either
      setAuthState(prev => ({ ...prev, error: null }));
      
      const response = await api.put('/users/profile', userData);
      
      if (response) {
        const updatedUser = { 
          ...authState.user!, 
          ...userData, 
          ...(response as any) 
        };
        
        setAuthState(prev => ({
          ...prev,
          user: updatedUser,
          isLoading: false, // Never loading
          error: null,
        }));
        
        return updatedUser;
      } else {
        throw new Error('Invalid response from profile update');
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      
      if (error.response?.status === 401) {
        const refreshSuccess = await refreshToken();
        
        if (refreshSuccess) {
          try {
            const retryResponse = await api.put('/users/profile', userData);
            if (retryResponse) {
              const updatedUser = { 
                ...authState.user!, 
                ...userData, 
                ...(retryResponse as any) 
              };
              setAuthState(prev => ({
                ...prev,
                user: updatedUser,
                isLoading: false,
                error: null,
              }));
              return updatedUser;
            }
          } catch (retryError) {
            console.error('Retry profile update failed:', retryError);
          }
        } else {
          logout();
        }
      }
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.response?.data?.message || error.message || 'Profile update failed. Please try again.',
      }));
      throw error;
    }
  };

  const fetchUserData = async (): Promise<boolean> => {
    try {
      // If we already have user data, no need to fetch again
      if (authState.user && authState.user.id) {
        return true;
      }

      // If we don't have a token, we can't fetch user data
      if (!authState.token) {
        return false;
      }

      // Try refresh to get user data
      const refreshSuccess = await refreshToken();
      
      if (!refreshSuccess) {
        // Refresh failed, user is now logged out
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateProfile,
        fetchUserData, // Add this to the context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};