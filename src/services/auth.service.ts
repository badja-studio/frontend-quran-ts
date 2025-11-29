import apiClient from './api.config';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      username: string;
      role: string;
    };
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data?: {
    authToken: string;
  };
}

class AuthService {
  /**
   * Login user with email, username, or siaga number
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);

      if (response.data.success && response.data.data) {
        // Store tokens and user info in localStorage
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('refreshToken', response.data.data.token); // Use same token as refresh for now
        localStorage.setItem('userName', response.data.data.user.username);
        localStorage.setItem('userRole', response.data.data.user.role);
      }

      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Login failed';
      const responseMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;

      return {
        success: false,
        message: responseMessage || errorMessage,
      };
    }
  }

  /**
   * Logout user - clear all stored data
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  }

  /**
   * Get stored auth token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Get stored refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  /**
   * Get stored user name
   */
  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  /**
   * Get stored user role
   */
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const refreshToken = this.getRefreshToken();

      if (!refreshToken) {
        return {
          success: false,
          message: 'No refresh token found',
        };
      }

      const response = await apiClient.post<RefreshTokenResponse>('/api/auth/refresh', {
        refreshToken,
      });

      if (response.data.success && response.data.data) {
        // Update auth token
        localStorage.setItem('authToken', response.data.data.authToken);
      }

      return response.data;
    } catch (error: unknown) {
      // Clear tokens if refresh fails
      this.logout();
      const errorMessage = error instanceof Error
        ? error.message
        : 'Token refresh failed';
      const responseMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;

      return {
        success: false,
        message: responseMessage || errorMessage,
      };
    }
  }
}

export default new AuthService();
