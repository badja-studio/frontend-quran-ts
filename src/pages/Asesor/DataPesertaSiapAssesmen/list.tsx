import { useState } from "react";
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
import ExportButton from "../../../components/Export/ExportButton";
import { filterConfigs } from "./config-filter";
import { columnsPeserta } from "./colum-table";
import { DataPersetaSiap, GetUsersResponse } from "./type";
import apiClient, { handleApiError } from "../../../services/api.config";
import { useUserProfile } from "../../../hooks/useUserProfile";

export default function ListAsesorPagesDataPesertaSiapAssement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const { data: user } = useUserProfile();

  // Fetch data with React Query
  const {
    data: response,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [
      "peserta-siap-asesmen-asesor",
      page,
      limit,
      searchQuery,
      sortBy,
      sortOrder,
      filters,
      user?.id,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());
      if (searchQuery) params.append("search", searchQuery);
      params.append("sortBy", sortBy);
      params.append("sortOrder", sortOrder);

      // Map operator names to backend format
      const operatorMap: Record<string, string> = {
        equals: "eq",
        contains: "contains",
        startsWith: "startsWith",
        endsWith: "endsWith",
        greaterThan: "gt",
        lessThan: "lt",
        greaterThanOrEqual: "gte",
        lessThanOrEqual: "lte",
        between: "between",
        in: "in",
      };

      // Inject default filter untuk status, asesor_id, dan jadwal hari ini
      // const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
      const formattedFilters: Array<{
        field: string;
        op: string;
        value: string | number | Date | string[];
      }> = [
        {
          field: "asesor_id",
          op: "eq",
          value: user!.id, // Non-null assertion karena sudah di-check di enabled
        },
        {
          field: "status",
          op: "eq",
          value: "BELUM",
        },
        // {
        //   field: "jadwal",
        //   op: "eq",
        //   value: currentDate,
        // },
      ];

      // Gabungkan dengan user filters
      if (filters.length > 0) {
        const userFilters = filters.map((filter) => ({
          field: filter.key,
          op: operatorMap[filter.operator] || filter.operator,
          value: filter.value,
        }));
        formattedFilters.push(...userFilters);
      }

      params.append("filters", JSON.stringify(formattedFilters));

      const result = await apiClient.get<GetUsersResponse>(
        `/api/participants?${params.toString()}`,
        {
          headers: { "Cache-Control": "no-cache" },
        }
      );

      // Setelah load pertama selesai
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }

      return result.data;
    },
    enabled: !!user?.id, // Hanya jalankan query jika user.id sudah tersedia
    retry: 1,
    staleTime: 30000, // 30 seconds
  });

  const transformedData: DataPersetaSiap[] =
    response?.data?.map((user) => ({
      id: user.id,
      nik: user.nik || "",
      no_akun: user.no_akun || "",
      username: user.username || "",
      email: user.email || "",
      no_handphone: user.no_handphone || "",
      nama: user.nama || "",
      jenis_kelamin: user.jenis_kelamin || "",
      tempat_lahir: user.tempat_lahir || "",
      tanggal_lahir: user.tanggal_lahir || "",
      jenjang: user.jenjang || "",
      sekolah: user.sekolah || "",
      alamat_sekolah: user.alamat_sekolah || "",
      provinsi: user.provinsi || "",
      kota: user.kota || "",
      kecamatan: user.kecamatan || "",
      kelurahan: user.kelurahan || "",
      pendidikan: user.pendidikan || "",
      perguruan_tinggi: user.perguruan_tinggi || "",
      fakultas: user.fakultas || "",
      prodi: user.prodi || "",
      tahun_lulus: Number(user.tahun_lulus) || 0,
      status_pegawai: user.status_pegawai || "",
      sertifikat_profesi: user.sertifikat_profesi || "",
      level: user.level || "",
      jadwal: user.jadwal || "",
      asesor: user.assessor?.name || "",
      status: user.status || "-",
    })) || [];

  const pagination = response?.pagination || {
    current_page: 1,
    per_page: 100,
    total: 0,
    total_pages: 0,
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset ke halaman 1 saat search
  };

  const handleFiltersApplied = (appliedFilters: FilterItem[]) => {
    setFilters(appliedFilters);
    setPage(1); // Reset to page 1 when filters change
  };

  const handleSortChange = (columnId: string) => {
    if (sortBy === columnId) {
      // Toggle sort order if same column
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      // New column, default to DESC
      setSortBy(columnId);
      setSortOrder("DESC");
    }
    setPage(1); // Reset to page 1 on sort change
  };

  // Full screen loading hanya di awal
  if (isInitialLoad && isLoading) {
    return (
      <DashboardLayout
        userRole="assessor"
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
      userRole="assessor"
      userName={user?.name || "Ustadz Ahmad"}
      userEmail={user?.email || "ahmad@quran.app"}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Data Peserta Siap Asesmen
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Peserta yang telah siap untuk mengikuti asesmen kompetensi hari
              ini
            </Typography>
            <Typography variant="caption" color="primary">
              Filter aktif: Jadwal{" "}
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>
          <ExportButton
            exportType="participants-ready-to-assess"
            filters={filters}
            searchQuery={searchQuery}
          />
        </Box>

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
          rowsPerPageOptions={[5, 10, 25, 50, 100, 150, 200, 205]}
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
          // Server-side sorting
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      </Box>
    </DashboardLayout>
  );
}
