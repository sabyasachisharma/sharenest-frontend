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
      const refreshTokenValue = cookieUtils.getRefreshToken();
      
      console.log('🔍 DEBUG: Checking cookies...');
      console.log('🔍 AccessToken from cookies:', accessToken);
      console.log('🔍 RefreshToken from cookies:', refreshTokenValue);
      console.log('🔍 cookieUtils.isAuthenticated():', cookieUtils.isAuthenticated());
      
      // Let's also check what cookies exist
      console.log('🍪 All cookies:', document.cookie);
      
      console.log('🔍 Auth Check - Access token found:', !!accessToken);
      console.log('🔍 Auth Check - Refresh token found:', !!refreshTokenValue);
      
      if (!accessToken) {
        console.log('❌ No access token found, setting authenticated to FALSE');
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        return;
      }

      console.log('✅ Access token found, setting authenticated to TRUE');
      api.setAuthToken(accessToken);
      
      setAuthState(prev => ({
        ...prev,
        token: accessToken,
        isAuthenticated: true,
        isLoading: false,
      }));

      // Try to get user data in background
      if (refreshTokenValue) {
        console.log('🔄 Attempting to get user data in background...');
        try {
          await refreshToken();
        } catch (error) {
          console.error('❌ Background refresh failed:', error);
        }
      }
    };

    loadUser();
  }, []);

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = cookieUtils.getRefreshToken();
      if (!refreshTokenValue) {
        console.log('No refresh token found');
        return false;
      }

      console.log('Attempting to refresh token...');
      const response = await api.post('/auth/refresh-token', { 
        refreshToken: refreshTokenValue 
      });

      if (response && (response as any).accessToken) {
        const { accessToken, refreshToken: newRefreshToken, user } = response as any;
        
        console.log('Token refresh successful with user data');
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
          isLoading: false, // Never loading
          error: null,
        }));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Only set loading for login operation, not for navbar
      setAuthState(prev => ({ ...prev, error: null }));
      console.log('Sending login request with:', { email, password });
      
      const response = await api.post('/auth/login', { email, password });
      
      console.log('Full login response:', response);
      
      if (response && (response as any).success && (response as any).user) {
        const { accessToken, refreshToken, user } = response as any;
        
        console.log('Login successful, storing tokens...');
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
      console.log('Sending registration request...', userData);
      
      const response = await api.post('/auth/register', userData);
      
      console.log('Full registration response:', response);
      
      // Handle the actual response structure - API interceptor extracts data
      if (response && (response as any).message === "Registration successful." && (response as any).user) {
        const { user } = response as any;
        
        console.log('Registration successful, user created:', user);
        
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
      console.log('Updating profile with data:', userData);
      
      const response = await api.put('/users/profile', userData);
      console.log('Profile update response:', response);
      
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
        
        console.log('Profile updated successfully, new user state:', updatedUser);
        return updatedUser;
      } else {
        throw new Error('Invalid response from profile update');
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      
      if (error.response?.status === 401) {
        console.log('Token might be expired, trying refresh...');
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
      if (!authState.token) {
        return false;
      }

      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Try refresh to get user data
      const refreshSuccess = await refreshToken();
      
      if (!refreshSuccess) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error fetching user data:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
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