import apiClient from './api';

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  name: string;
  fullname: string;
  roles: string;
}

export interface LoginPayload {
  emailOrUsername: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user?: {
    id: string;
    email: string;
    username: string;
    name: string;
    fullname: string;
    roles: string;
  };
}

class AuthService {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', payload);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
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
}

export default new AuthService();
