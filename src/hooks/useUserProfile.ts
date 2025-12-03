import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api.config";
import authService from "../services/auth.service";

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  role?: "admin" | "assessor" | "participant";
}

export function useUserProfile() {
  const role = authService.getUserRole() as UserProfile["role"];
  const isAuthenticated = authService.isAuthenticated();

  return useQuery<UserProfile>({
    queryKey: ["user-profile", role],
    queryFn: async () => {
      let endpoint = "/api/participants/profile";
      if (role === "admin") endpoint = "/api/admins/profile";
      else if (role === "assessor") endpoint = "/api/assessors/profile";

      const response = await api.get<UserProfile>(endpoint);

      if (response.success && response.data) {
        return { ...response.data, role };
      }

      throw new Error(response.message ?? "Gagal memuat data.");
    },
    enabled: isAuthenticated && !!role, // Only fetch if authenticated and has role
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
