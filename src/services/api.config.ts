import axios, { AxiosRequestConfig } from "axios";

// Standard API Response Interface
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Standard API Error Interface
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
  timestamp?: string;
}

// Custom Error Class
export class ApiException extends Error {
  public readonly success = false as const;
  public statusCode?: number;
  public errors?: Record<string, string[]>;
  public timestamp: string;

  constructor(error: ApiError) {
    super(error.message);
    this.name = "ApiException";
    this.statusCode = error.statusCode;
    this.errors = error.errors;
    this.timestamp = error.timestamp || new Date().toISOString();
  }

  // Helper untuk mendapatkan error pertama dari field tertentu
  getFieldError(field: string): string | undefined {
    return this.errors?.[field]?.[0];
  }

  // Helper untuk mendapatkan semua error messages
  getAllErrors(): string[] {
    if (!this.errors) return [this.message];
    return Object.values(this.errors).flat();
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Fungsi untuk decode JWT tanpa library
const decodeToken = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

// Fungsi untuk cek apakah token akan expired dalam 5 menit
const isTokenExpiringSoon = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const expirationTime = decoded.exp * 1000; // convert to milliseconds
  const currentTime = Date.now();
  const fiveMinutes = 5 * 60 * 1000;

  return expirationTime - currentTime < fiveMinutes;
};

// Fungsi untuk refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

const refreshAuthToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken,
    });

    const { token: newToken, refreshToken: newRefreshToken } = response.data;

    if (newToken) {
      localStorage.setItem("authToken", newToken);
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }
      return newToken;
    }

    return null;
  } catch (error) {
    // Refresh token gagal atau expired
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    return null;
  }
};

// Request interceptor to add auth token and auto-refresh if needed
apiClient.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("authToken");

    // Cek apakah token akan expired, jika ya refresh dulu
    if (token && isTokenExpiringSoon(token)) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAuthToken();
          if (newToken) {
            token = newToken;
            processQueue();
          } else {
            processQueue(new Error("Refresh token failed"));
            // Redirect ke login jika refresh gagal
            if (
              window.location.pathname !== "/login" &&
              window.location.pathname !== "/"
            ) {
              window.location.href = "/login";
            }
          }
        } catch (error) {
          processQueue(error);
          throw error;
        } finally {
          isRefreshing = false;
        }
      } else {
        // Tunggu refresh token selesai
        await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
        token = localStorage.getItem("authToken");
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (status === 401 && !originalRequest._retry) {
        // Coba refresh token sekali lagi
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const newToken = await refreshAuthToken();
            if (newToken) {
              processQueue();
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return apiClient(originalRequest);
            } else {
              processQueue(new Error("Refresh token failed"));
              // Clear tokens and redirect to login
              localStorage.removeItem("authToken");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("userName");
              localStorage.removeItem("userRole");

              if (
                window.location.pathname !== "/login" &&
                window.location.pathname !== "/"
              ) {
                window.location.href = "/login";
              }
            }
          } catch (refreshError) {
            processQueue(refreshError);
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        } else {
          // Tunggu refresh token selesai
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: () => {
                originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
                  "authToken"
                )}`;
                resolve(apiClient(originalRequest));
              },
              reject: (err) => {
                reject(err);
              },
            });
          });
        }
      }

      // Format error response
      const apiError: ApiError = {
        success: false,
        message: data?.message || "Terjadi kesalahan pada server",
        errors: data?.errors,
        statusCode: status,
        timestamp: new Date().toISOString(),
      };
      return Promise.reject(new ApiException(apiError));
    } else if (error.request) {
      // Request made but no response received
      const apiError: ApiError = {
        success: false,
        message:
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
        statusCode: 0,
        timestamp: new Date().toISOString(),
      };
      return Promise.reject(new ApiException(apiError));
    } else {
      // Something else happened
      const apiError: ApiError = {
        success: false,
        message: error.message || "Terjadi kesalahan yang tidak terduga",
        timestamp: new Date().toISOString(),
      };
      return Promise.reject(new ApiException(apiError));
    }
  }
);

// Generic API methods with standard response
export const api = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<ApiResponse<T>>(url, config).then((res) => res.data),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) =>
    apiClient.post<ApiResponse<T>>(url, data, config).then((res) => res.data),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => apiClient.put<ApiResponse<T>>(url, data, config).then((res) => res.data),

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) =>
    apiClient.patch<ApiResponse<T>>(url, data, config).then((res) => res.data),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<ApiResponse<T>>(url, config).then((res) => res.data),
};

// Helper function untuk handle API errors
export const handleApiError = (error: unknown): ApiException => {
  if (error instanceof ApiException) {
    return error;
  }

  return new ApiException({
    success: false,
    message:
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan yang tidak terduga",
    timestamp: new Date().toISOString(),
  });
};

export default apiClient;
