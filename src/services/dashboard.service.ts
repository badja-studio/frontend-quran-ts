import { api, ApiResponse } from './api.config';

// Dashboard Data Types
export interface BasicStatistics {
  totalParticipants: number;
  completedAssessments: number;
  totalAssessors: number;
  avgScore: number;
}

export interface ParticipationByLevel {
  title: string;
  total: number;
  done: number;
  color?: string;
}

export interface ParticipationByProvince {
  name: string;
  registered: number;
  participated: number;
}

export interface DemographicData {
  name: string;
  value: number;
}

export interface AverageScoreData {
  label: string;
  value: string;
  color?: string;
  icon?: React.ReactNode;
}

export interface ProvinceAchievement {
  name: string;
  terendah: number;
  tertinggi: number;
  rata: number;
}

export interface FluencyLevel {
  name: string;
  lancar: number;
  mahir: number;
  kurang_lancar: number;
}

export interface ErrorStatistic {
  name: string;
  total: number;
}

export interface DashboardOverview {
  basicStats: BasicStatistics;
  participationByLevel: ParticipationByLevel[];
  participationByProvince: ParticipationByProvince[];
  demographics: {
    gender: DemographicData[];
    employeeStatus: DemographicData[];
    institutionType: DemographicData[];
  };
  averageScores: AverageScoreData[];
}

export interface ParticipationStats {
  byEducationLevel: ParticipationByLevel[];
  byProvince: ParticipationByProvince[];
}

export interface DemographicsData {
  gender: DemographicData[];
  employeeStatus: DemographicData[];
  institutionType: DemographicData[];
}

export interface PerformanceAnalytics {
  averageScores: AverageScoreData[];
  provinceAchievement: ProvinceAchievement[];
  fluencyLevels: FluencyLevel[];
}

export interface ErrorAnalysis {
  makharij: ErrorStatistic[];
  sifat: ErrorStatistic[];
  ahkam: ErrorStatistic[];
  mad: ErrorStatistic[];
  penalties: ErrorStatistic[];
}

export interface ProvinceData {
  participation: ParticipationByProvince[];
  achievement: ProvinceAchievement[];
  fluency: FluencyLevel[];
}

class DashboardService {
  private readonly baseUrl = '/api/dashboard';

  /**
   * Get comprehensive dashboard overview data
   */
  async getDashboardOverview(): Promise<DashboardOverview> {
    const response: ApiResponse<DashboardOverview> = await api.get(`${this.baseUrl}/overview`);
    return response.data!;
  }

  /**
   * Get basic statistics
   */
  async getBasicStatistics(): Promise<BasicStatistics> {
    const response: ApiResponse<BasicStatistics> = await api.get(`${this.baseUrl}/statistics`);
    return response.data!;
  }

  /**
   * Get participation statistics
   */
  async getParticipationStats(): Promise<ParticipationStats> {
    const response: ApiResponse<ParticipationStats> = await api.get(`${this.baseUrl}/participation`);
    return response.data!;
  }

  /**
   * Get demographic data
   */
  async getDemographicData(): Promise<DemographicsData> {
    const response: ApiResponse<DemographicsData> = await api.get(`${this.baseUrl}/demographics`);
    return response.data!;
  }

  /**
   * Get performance analytics
   */
  async getPerformanceAnalytics(): Promise<PerformanceAnalytics> {
    const response: ApiResponse<PerformanceAnalytics> = await api.get(`${this.baseUrl}/performance`);
    return response.data!;
  }

  /**
   * Get error analysis data
   */
  async getErrorAnalysis(): Promise<ErrorAnalysis> {
    const response: ApiResponse<ErrorAnalysis> = await api.get(`${this.baseUrl}/errors`);
    return response.data!;
  }

  /**
   * Get province data
   */
  async getProvinceData(): Promise<ProvinceData> {
    const response: ApiResponse<ProvinceData> = await api.get(`${this.baseUrl}/provinces`);
    return response.data!;
  }

  /**
   * Helper method to get all dashboard data in parallel
   */
  async getAllDashboardData(): Promise<{
    overview: DashboardOverview;
    performance: PerformanceAnalytics;
    errors: ErrorAnalysis;
    provinces: ProvinceData;
  }> {
    try {
      const [overview, performance, errors, provinces] = await Promise.all([
        this.getDashboardOverview(),
        this.getPerformanceAnalytics(),
        this.getErrorAnalysis(),
        this.getProvinceData(),
      ]);

      return {
        overview,
        performance,
        errors,
        provinces,
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const dashboardService = new DashboardService();
