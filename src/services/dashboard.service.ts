import { api, ApiResponse } from "./api.config";

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
  [key: string]: string | number;
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

export interface ScoreDistributionByLevel {
  tingkat: 'RA' | 'MI' | 'MTS' | 'MA';
  jml_0_59: number;
  jml_60_89: number;
  jml_90_100: number;
  total: number;
}

export interface ScoreDistributionBySubject {
  mata_pelajaran: string;
  jml_0_59: number;
  jml_60_89: number;
  jml_90_100: number;
  total_peserta: number;
}

class DashboardService {
  private readonly baseUrl = "/api/dashboard";

  /**
   * Get list of distinct provinces that exist in database
   */
  async getProvincesList(): Promise<string[]> {
    const response: ApiResponse<string[]> = await api.get(
      `${this.baseUrl}/provinces-list`
    );
    return response.data!;
  }

  /**
   * Get comprehensive dashboard overview data
   */
  async getDashboardOverview(provinsi?: string): Promise<DashboardOverview> {
    const params = provinsi ? `?provinsi=${encodeURIComponent(provinsi)}` : '';
    const response: ApiResponse<DashboardOverview> = await api.get(
      `${this.baseUrl}/overview${params}`
    );
    return response.data!;
  }

  /**
   * Get basic statistics
   */
  async getBasicStatistics(provinsi?: string): Promise<BasicStatistics> {
    const params = provinsi ? `?provinsi=${encodeURIComponent(provinsi)}` : '';
    const response: ApiResponse<BasicStatistics> = await api.get(
      `${this.baseUrl}/statistics${params}`
    );
    return response.data!;
  }

  /**
   * Get participation statistics
   */
  async getParticipationStats(provinsi?: string): Promise<ParticipationStats> {
    const params = provinsi ? `?provinsi=${encodeURIComponent(provinsi)}` : '';
    const response: ApiResponse<ParticipationStats> = await api.get(
      `${this.baseUrl}/participation${params}`
    );
    return response.data!;
  }

  /**
   * Get demographic data
   */
  async getDemographicData(provinsi?: string): Promise<DemographicsData> {
    const params = provinsi ? `?provinsi=${encodeURIComponent(provinsi)}` : '';
    const response: ApiResponse<DemographicsData> = await api.get(
      `${this.baseUrl}/demographics${params}`
    );
    return response.data!;
  }

  /**
   * Get performance analytics
   */
  async getPerformanceAnalytics(provinsi?: string): Promise<PerformanceAnalytics> {
    const params = provinsi ? `?provinsi=${encodeURIComponent(provinsi)}` : '';
    const response: ApiResponse<PerformanceAnalytics> = await api.get(
      `${this.baseUrl}/performance${params}`
    );
    return response.data!;
  }

  /**
   * Get error analysis data
   */
  async getErrorAnalysis(provinsi?: string): Promise<ErrorAnalysis> {
    const params = provinsi ? `?provinsi=${encodeURIComponent(provinsi)}` : '';
    const response: ApiResponse<ErrorAnalysis> = await api.get(
      `${this.baseUrl}/errors${params}`
    );
    return response.data!;
  }

  /**
   * Get province data
   */
  async getProvinceData(provinsi?: string): Promise<ProvinceData> {
    const params = provinsi ? `?provinsi=${encodeURIComponent(provinsi)}` : '';
    const response: ApiResponse<ProvinceData> = await api.get(
      `${this.baseUrl}/provinces${params}`
    );
    return response.data!;
  }

  /**
   * Get score distribution by education level
   */
  async getScoreDistributionByLevel(provinsi?: string): Promise<ScoreDistributionByLevel[]> {
    const params = provinsi ? `?provinsi=${encodeURIComponent(provinsi)}` : '';
    const response: ApiResponse<ScoreDistributionByLevel[]> = await api.get(
      `${this.baseUrl}/score-distribution-by-level${params}`
    );
    return response.data!;
  }

  /**
   * Get score distribution by subject
   */
  async getScoreDistributionBySubject(provinsi?: string): Promise<ScoreDistributionBySubject[]> {
    const params = provinsi ? `?provinsi=${encodeURIComponent(provinsi)}` : '';
    const response: ApiResponse<ScoreDistributionBySubject[]> = await api.get(
      `${this.baseUrl}/score-distribution-by-subject${params}`
    );
    return response.data!;
  }

  /**
   * Helper method to get all dashboard data in parallel
   */
  async getAllDashboardData(provinsi?: string): Promise<{
    overview: DashboardOverview;
    performance: PerformanceAnalytics;
    errors: ErrorAnalysis;
    provinces: ProvinceData;
  }> {
    try {
      const [overview, performance, errors, provinces] = await Promise.all([
        this.getDashboardOverview(provinsi),
        this.getPerformanceAnalytics(provinsi),
        this.getErrorAnalysis(provinsi),
        this.getProvinceData(provinsi),
      ]);

      return {
        overview,
        performance,
        errors,
        provinces,
      };
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const dashboardService = new DashboardService();
