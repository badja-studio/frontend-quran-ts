import { create } from "zustand";
import { api, handleApiError } from "../services/api.config";

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  role?: "admin" | "assessor" | "participant";
}

interface UserStore {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setUser: (userData: UserProfile | null) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (userData) => set({ user: userData, error: null }),
  clearUser: () => set({ user: null, error: null }),

  fetchUser: async () => {
    const current = useUserStore.getState();
    if (current.user || current.loading) return;

    console.log("[UserStore] Fetch user started");
    set({ loading: true, error: null });

    try {
      const role = localStorage.getItem("userRole") as UserProfile["role"];
      let endpoint = "/api/participants/profile";
      if (role === "admin") endpoint = "/api/admins/profile";
      else if (role === "assessor") endpoint = "/api/assessors/profile";

      const response = await api.get<UserProfile>(endpoint);

      if (response.success && response.data) {
        set({
          user: { ...response.data, role },
          loading: false,
        });
        console.log("[UserStore] Fetch user success:", response.data);
      } else {
        set({
          error: response.message ?? "Gagal memuat data.",
          loading: false,
        });
        console.log("[UserStore] Fetch user failed:", response.message);
      }
    } catch (err) {
      const apiError = handleApiError(err);
      set({ error: apiError.message, loading: false });
      console.log("[UserStore] Fetch user error:", apiError.message);
    }
  },
}));

export default useUserStore;
