import apiClient from './api.config';

export interface LoginCredentials {
  emailOrUsername?: string;
  siagaNumber?: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    name: string;
    roles: string;
    authToken: string;
    refreshToken: string;
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data?: {
    authToken: string;
    token: string;
  };
}

class AuthService {
  /**
   * Login user with email, username, or siaga number
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/v1/auth/login', credentials);
      
      if (response.data.success && response.data.data) {
        // Store tokens and user info in localStorage
        localStorage.setItem('authToken', response.data.data.authToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        localStorage.setItem('userName', response.data.data.name);
        localStorage.setItem('userRole', response.data.data.roles);
      }
      
      return response.data;
    } catch (error: any) {
      // Error is already formatted by axios interceptor
      return error;
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
        throw new Error('No refresh token found');
      }

      const response = await apiClient.post<RefreshTokenResponse>('/v1/auth/refresh', {
        refreshToken,
      });

      if (response.data.success && response.data.data) {
        // Update auth token
        localStorage.setItem('authToken', response.data.data.authToken);
      }

      return response.data;
    } catch (error: any) {
      // Clear tokens if refresh fails
      this.logout();
      return error;
    }
  }
}

export default new AuthService();
