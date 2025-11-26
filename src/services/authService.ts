import apiClient from './api';

export interface RegisterPayload {
  siagaNumber: string;
  email: string;
  password: string;
  username: string;
  name: string;
  fullname: string;
  phoneNumber?: string;
  schoolLevels?: string;
  levels?: string;
  roles?: string;
}

export interface LoginPayload {
  emailOrUsername?: string;
  siagaNumber?: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    authToken: string;
    refreshToken: string;
    name?: string;
    roles?: string;
    user?: {
      id: string;
      email: string;
      username: string;
      name: string;
      fullname: string;
      siagaNumber: string;
      roles: string;
    };
  };
}

export interface UserInfo {
  id: string;
  email: string;
  roles: string;
  name?: string;
}

class AuthService {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/v1/auth/register', payload);
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      if (response.data.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
    }
    return response.data;
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/v1/auth/login', payload);
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      
      // Decode and store user info
      const userInfo = this.decodeToken(response.data.data.token);
      if (userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
      }
      
      // Also store name and roles from response
      if (response.data.data.name || response.data.data.roles) {
        const storedInfo = {
          ...userInfo,
          name: response.data.data.name,
          roles: response.data.data.roles
        };
        localStorage.setItem('userInfo', JSON.stringify(storedInfo));
      }
    }
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserInfo(): UserInfo | null {
    const userInfoStr = localStorage.getItem('userInfo');
    if (userInfoStr) {
      try {
        return JSON.parse(userInfoStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  getUserRole(): string | null {
    const userInfo = this.getUserInfo();
    return userInfo?.roles || null;
  }

  decodeToken(token: string): UserInfo | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }
}

export default new AuthService();

