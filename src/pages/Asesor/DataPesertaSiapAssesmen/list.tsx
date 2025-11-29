import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  LinearProgress,
} from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import { filterConfigs } from "./config-filter";
import { columnsPeserta } from "./colum-table";
import { DataPersetaSiap, GetUsersResponse } from "./type";
import apiClient, { handleApiError } from "../../../services/api.config";
import useUserStore from "../../../store/user.store";

export default function ListAsesorPagesDataPesertaSiapAssement() {
  const { user, fetchUser } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filters, setFilters] = useState<FilterItem[]>([]);

  useEffect(() => {
    fetchUser()
      .then(() => console.log("User fetched successfully"))
      .catch((err) => console.error("Error fetching user:", err));
  }, [fetchUser]);
  const endpoint =
    user?.role === "admin"
      ? "/api/admin/profile"
      : user?.role === "assessor"
      ? "/api/assessors/profile"
      : "/api/participants/profile";

  const {
    data: response,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["users", page, limit, searchQuery, endpoint],
    queryFn: async () => {
      if (!endpoint) return { data: [] };
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());
      if (searchQuery) params.append("search", searchQuery);
      params.append("sortBy", "createdAt");
      params.append("sortOrder", "DESC");

      const result = await apiClient.get<GetUsersResponse>(
        `/api/participants?${params.toString()}`
      );

      // Setelah load pertama selesai
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }

      return result.data;
    },
    retry: 1,
    staleTime: 30000, // 30 seconds
  });

  const transformedData: DataPersetaSiap[] =
    response?.data?.map((user) => ({
      id: user.id,
      no_akun: user.no_akun || "-",
      nip: user.nip || "-",
      nama: user.nama || "-",
      jenis_kelamin: user.jenis_kelamin || "L",
      tempat_lahir: user.tempat_lahir || "-",
      jabatan: user.jabatan || "-",
      jenjang: user.jenjang || "-",
      level: user.level || "-",
      provinsi: user.provinsi || "-",
      kab_kota: user.kab_kota || "-",
      sekolah: user.sekolah || "-",
      pendidikan: user.pendidikan || "-",
      prodi: user.prodi || "-",
      perguruan_tinggi: user.perguruan_tinggi || "-",
      jenis_pt: user.jenis_pt || "-",
      tahun_lulus: user.tahun_lulus || "-",
      jadwal: user.jadwal || "-",
      asesor: user.assessor?.name || "-",
      status: user.status || "-",
    })) || [];

  const pagination =
    response && "pagination" in response && response.pagination
      ? response.pagination
      : {
          current_page: 1,
          per_page: 10,
          total: 0,
          total_pages: 0,
        };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset ke halaman 1 saat search
  };

  const handleFiltersApplied = (appliedFilters: FilterItem[]) => {
    setFilters(appliedFilters);
  };

  // Full screen loading hanya di awal
  if (isInitialLoad && isLoading) {
    return (
      <DashboardLayout
        userRole={user?.role === "admin" ? "admin" : "assessor"}
        userName={user?.name || "Ustadz Ahmad"}
        userEmail={user?.email || "ahmad@quran.app"}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      userRole={user?.role === "admin" ? "admin" : "assessor"}
      userName={user?.name || "Ustadz Ahmad"}
      userEmail={user?.email || "ahmad@quran.app"}
    >
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Data Peserta Siap Asesmen
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Peserta yang telah siap untuk mengikuti asesmen kompetensi
        </Typography>

        {/* Loading indicator untuk search/filter/pagination */}
        {isFetching && !isInitialLoad && (
          <Box sx={{ width: "100%", mb: 2 }}>
            <LinearProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {handleApiError(error).message}
          </Alert>
        )}
        <DataTable
          columns={columnsPeserta}
          data={transformedData}
          rowsPerPageOptions={[5, 10, 25]}
          emptyMessage={
            isFetching ? "Memuat data..." : "Belum ada data peserta"
          }
          enableFilter={true}
          filterConfigs={filterConfigs}
          onFiltersApplied={handleFiltersApplied}
          enableSearch={true}
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Cari peserta (nama, NIP, NIS, dll)..."
          enableExport={true}
          // Server-side pagination
          serverSide={true}
          totalCount={pagination.total}
          page={page - 1} // DataTable uses 0-indexed, API uses 1-indexed
          rowsPerPage={limit}
          onPageChange={(newPage) => setPage(newPage + 1)} // Convert back to 1-indexed
          onRowsPerPageChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1); // Reset to page 1
          }}
        />
      </Box>
    </DashboardLayout>
  );
}
