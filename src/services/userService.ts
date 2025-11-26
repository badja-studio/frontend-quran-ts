import apiClient from './api';

export interface User {
  id: string;
  siagaNumber: string;
  email: string;
  username: string;
  name: string;
  fullname: string;
  phoneNumber?: string;
  schoolLevels?: string;
  schoolName?: string;
  levels?: string;
  district?: string;
  waLink?: string;
  roles: 'Admin' | 'Assessor' | 'Assessee';
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    users: T[];
    pagination: PaginationMeta;
  };
}

class UserService {
  async getUsers(page: number = 1, limit: number = 10, search: string = ''): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) {
      params.append('search', search);
    }
    
    const response = await apiClient.get<PaginatedResponse<User>>(`/v1/users?${params.toString()}`);
    return response.data;
  }

  async getUserById(id: string): Promise<{ success: boolean; message: string; data: { user: User } }> {
    const response = await apiClient.get<{ success: boolean; message: string; data: { user: User } }>(`/v1/users/${id}`);
    return response.data;
  }
}

export default new UserService();
