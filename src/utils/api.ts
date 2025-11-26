import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  data: T | null;
  message: string;
  error?: any;
}

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 100000,
});

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const getAccessToken = () => localStorage.getItem(TOKEN_KEY);
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/v1/auth/refresh`,
      { refreshToken }
    );

    const newAccess = response.data?.data?.accessToken;
    const newRefresh = response.data?.data?.refreshToken;

    if (newAccess && newRefresh) {
      setTokens(newAccess, newRefresh);
      return newAccess;
    }

    return null;
  } catch {
    clearTokens();
    return null;
  }
};

API.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const newToken = await refreshAccessToken();
      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return API(original);
      }

      clearTokens();
    }

    return Promise.reject(error);
  }
);

const handleResponse = <T>(res: AxiosResponse<T>): ApiResponse<T> => ({
  success: true,
  status: res.status,
  data: (res.data as any)?.data ?? res.data,
  message: (res.data as any)?.message ?? "Success",
});

const handleError = (err: AxiosError): ApiResponse => ({
  success: false,
  status: err.response?.status ?? 500,
  data: null,
  message:
    (err.response?.data as any)?.message ?? err.message ?? "Terjadi kesalahan",
  error: err.response?.data,
});

const api = {
  get: async <T>(url: string, params: any = {}) => {
    try {
      const res = await API.get<T>(url, { params });
      return handleResponse(res);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  },

  post: async <T>(url: string, body: any = {}, config: any = {}) => {
    try {
      const res = await API.post<T>(url, body, config);
      return handleResponse(res);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  },

  put: async <T>(url: string, body: any = {}) => {
    try {
      const res = await API.put<T>(url, body);
      return handleResponse(res);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  },

  delete: async <T>(url: string) => {
    try {
      const res = await API.delete<T>(url);
      return handleResponse(res);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  },

  auth: {
    setTokens,
    clearTokens,
    getAccessToken,
    getRefreshToken,
  },
};

export default api;
