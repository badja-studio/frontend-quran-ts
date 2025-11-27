import apiClient from './api.config';

export interface User {
  id: string;
  siagaNumber: string;
  email: string;
  username: string;
  name: string;
  fullname: string;
  phoneNumber?: string;
  accountNumber?: string;
  nip?: string;
  gender?: 'L' | 'P';
  birthPlace?: string;
  position?: string;
  province?: string;
  schoolLevels?: string;
  schoolName?: string;
  levels?: string;
  district?: string;
  education?: string;
  studyProgram?: string;
  university?: string;
  universityType?: 'Negeri' | 'Swasta';
  graduationYear?: string;
  roles: 'Admin' | 'Assessor' | 'Assessee';
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
    pagination: Pagination;
  };
}

export interface AssesseesResponse {
  success: boolean;
  message: string;
  data: {
    assessees: User[];
    pagination: Pagination;
  };
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

class UserService {
  /**
   * Get all users with pagination, search, and sorting
   */
  async getAllUsers(params: QueryParams = {}): Promise<UsersResponse> {
    try {
      const { page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'DESC' } = params;
      
      const response = await apiClient.get<UsersResponse>('/v1/users', {
        params: { page, limit, search, sortBy, sortOrder }
      });
      
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<{ success: boolean; message: string; data: { user: User } }> {
    try {
      const response = await apiClient.get(`/v1/users/${id}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Get all assessees with pagination, search, and sorting
   */
  async getAllAssessees(params: QueryParams = {}): Promise<AssesseesResponse> {
    try {
      const { page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'DESC' } = params;
      
      const response = await apiClient.get<AssesseesResponse>('/v1/admin/assessees', {
        params: { page, limit, search, sortBy, sortOrder }
      });
      
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Get assessees not assessed (belum asesmen)
   */
  async getAssesseesNotAssessed(params: QueryParams = {}): Promise<AssesseesResponse> {
    try {
      const { page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'DESC' } = params;
      
      const response = await apiClient.get<AssesseesResponse>('/v1/admin/assessees/not-assessed', {
        params: { page, limit, search, sortBy, sortOrder }
      });
      
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Get assessees ready for assessment (siap asesmen)
   */
  async getAssesseesReadyForAssessment(params: QueryParams = {}): Promise<AssesseesResponse> {
    try {
      const { page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'DESC' } = params;
      
      const response = await apiClient.get<AssesseesResponse>('/v1/admin/assessees/ready-for-assessment', {
        params: { page, limit, search, sortBy, sortOrder }
      });
      
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Get assessees with results (hasil asesmen)
   */
  async getAssesseesWithResults(params: QueryParams = {}): Promise<AssesseesResponse> {
    try {
      const { page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'DESC' } = params;
      
      const response = await apiClient.get<AssesseesResponse>('/v1/admin/assessees/with-results', {
        params: { page, limit, search, sortBy, sortOrder }
      });
      
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Update user
   */
  async updateUser(id: string, data: Partial<User>): Promise<{ success: boolean; message: string; data: { user: User } }> {
    try {
      const response = await apiClient.put(`/v1/users/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.delete(`/v1/users/${id}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

export default new UserService();
