import Cookies from 'js-cookie';

// Cookie names
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ID_KEY = 'userId';

// Cookie options
const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

export const cookieUtils = {
  // Set authentication tokens
  setAuthTokens: (accessToken: string, refreshToken: string, userId: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      ...COOKIE_OPTIONS,
      expires: 1, // 1 day for access token
    });
    
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      ...COOKIE_OPTIONS,
      expires: 7, // 7 days for refresh token
    });
    
    Cookies.set(USER_ID_KEY, userId, {
      ...COOKIE_OPTIONS,
      expires: 7, // 7 days for user ID
    });
  },

  // Get access token
  getAccessToken: (): string | undefined => {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },

  // Get refresh token
  getRefreshToken: (): string | undefined => {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },

  // Get user ID
  getUserId: (): string | undefined => {
    return Cookies.get(USER_ID_KEY);
  },

  // Clear all authentication cookies
  clearAuthTokens: () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    Cookies.remove(USER_ID_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!Cookies.get(ACCESS_TOKEN_KEY);
  },
}; 