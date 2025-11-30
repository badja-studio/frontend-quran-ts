
export interface FilterValue {
  key: string;
  operator: string;
  value: string | number | boolean | string[] | number[] | Date;
}

export interface ExportFilters {
  searchQuery?: string;
  filters?: FilterValue[];
}

export interface ExportOptions {
  format: 'excel' | 'pdf';
  filters?: ExportFilters;
  filename?: string;
}

class ExportService {
  private async downloadFile(url: string, filename: string) {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }

  private buildQueryString(filters: ExportFilters = {}): string {
    const params = new URLSearchParams();

    if (filters.searchQuery) {
      params.append('search', filters.searchQuery);
    }

    if (filters.filters && Array.isArray(filters.filters) && filters.filters.length > 0) {
      // Map operator names to backend format
      const operatorMap: Record<string, string> = {
        'equals': 'eq',
        'contains': 'contains',
        'startsWith': 'startsWith',
        'endsWith': 'endsWith',
        'greaterThan': 'gt',
        'lessThan': 'lt',
        'greaterThanOrEqual': 'gte',
        'lessThanOrEqual': 'lte',
        'between': 'between',
        'in': 'in',
      };

      const formattedFilters = filters.filters.map((filter: FilterValue) => ({
        field: filter.key,
        op: operatorMap[filter.operator] || filter.operator,
        value: filter.value
      }));

      params.append('filters', JSON.stringify(formattedFilters));
    }

    return params.toString();
  }  // Participants exports
  async exportParticipants(options: ExportOptions): Promise<void> {
    const queryString = this.buildQueryString(options.filters);
    const baseUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3012/api'}/api/export/participants`;
    const url = `${baseUrl}/${options.format}?${queryString}`;
    const filename = options.filename || `data-peserta-${new Date().toISOString().split('T')[0]}.${options.format === 'excel' ? 'xlsx' : 'pdf'}`;
    
    await this.downloadFile(url, filename);
  }

  // Participants not assessed exports
  async exportParticipantsNotAssessed(options: ExportOptions): Promise<void> {
    const queryString = this.buildQueryString(options.filters);
    const baseUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3012/api'}/api/export/participants/not-assessed`;
    const url = `${baseUrl}/${options.format}?${queryString}`;
    const filename = options.filename || `data-peserta-belum-asesmen-${new Date().toISOString().split('T')[0]}.${options.format === 'excel' ? 'xlsx' : 'pdf'}`;
    
    await this.downloadFile(url, filename);
  }

  // Participants ready to assess exports
  async exportParticipantsReadyToAssess(options: ExportOptions): Promise<void> {
    const queryString = this.buildQueryString(options.filters);
    const baseUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3012/api'}/api/export/participants/ready-to-assess`;
    const url = `${baseUrl}/${options.format}?${queryString}`;
    const filename = options.filename || `data-peserta-siap-asesmen-${new Date().toISOString().split('T')[0]}.${options.format === 'excel' ? 'xlsx' : 'pdf'}`;
    
    await this.downloadFile(url, filename);
  }

  // Assessors exports
  async exportAssessors(options: ExportOptions): Promise<void> {
    const queryString = this.buildQueryString(options.filters);
    const baseUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3012/api'}/api/export/assessors`;
    const url = `${baseUrl}/${options.format}?${queryString}`;
    const filename = options.filename || `data-asesor-${new Date().toISOString().split('T')[0]}.${options.format === 'excel' ? 'xlsx' : 'pdf'}`;
    
    await this.downloadFile(url, filename);
  }

  // Assessments exports
  async exportAssessments(options: ExportOptions): Promise<void> {
    const queryString = this.buildQueryString(options.filters);
    const baseUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3012/api'}/api/export/assessments`;
    const url = `${baseUrl}/${options.format}?${queryString}`;
    const filename = options.filename || `data-hasil-asesmen-${new Date().toISOString().split('T')[0]}.${options.format === 'excel' ? 'xlsx' : 'pdf'}`;
    
    await this.downloadFile(url, filename);
  }
}

export const exportService = new ExportService();

// Hook for easier usage in React components
import { useState } from 'react';
import { handleApiError } from './api.config';

export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const exportData = async (
    exportFunction: (options: ExportOptions) => Promise<void>,
    options: ExportOptions
  ) => {
    try {
      setIsExporting(true);
      setExportError(null);
      await exportFunction(options);
    } catch (error) {
      const apiError = handleApiError(error);
      setExportError(apiError.message);
      throw apiError;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportError,
    exportData,
    clearError: () => setExportError(null),
  };
};
