import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import { filterConfigs } from "./config-filter";
import { columnsAsesor } from "./colum-table";
import useUserStore from "../../../store/user.store";
import { useQuery } from "@tanstack/react-query";
import apiClient, { handleApiError } from "../../../services/api.config";
import { DataAsesor, AssessorResponse, Assessor } from "./type";

export default function ListPagesDataAsesor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const { user, fetchUser } = useUserStore();

  // Fetch data with React Query
  const {
    data: response,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["data-asesor-admin", page, limit, searchQuery, sortBy, sortOrder, filters],
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

      const formattedFilters = filters.map(filter => ({
        field: filter.key,
        op: operatorMap[filter.operator] || filter.operator,
        value: filter.value
      }));
      params.append("filters", JSON.stringify(formattedFilters));

      const result = await apiClient.get<AssessorResponse>(
        `/api/assessors?${params.toString()}`
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

  // Transform data untuk table
  const transformedData: DataAsesor[] =
    response?.data?.map((assessor: Assessor): DataAsesor => ({
      id: assessor.id,
      name: assessor.name,
      username: assessor.username,
      no_telepon: assessor.no_telepon,
      email: assessor.email,
      link_grup_wa: assessor.link_grup_wa,
      total_peserta_belum_asesmen: assessor.total_peserta_belum_asesmen,
      total_peserta_selesai_asesmen: assessor.total_peserta_selesai_asesmen,
      akun_id: assessor.akun_id,
    })) || [];

  const pagination = response?.pagination || {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
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

  useEffect(() => {
    fetchUser();
  }, [user, fetchUser]);

  // Full screen loading hanya di awal
  if (isInitialLoad && isLoading) {
    return (
      <DashboardLayout
        userRole="admin"
        userName={`${user?.name}`}
        userEmail="ahmad@quran.app"
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
      userRole="admin"
      userName={`${user?.name}`}
      userEmail="ahmad@quran.app"
    >
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Daftar Rekap Asesor
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Pantau dan kelola rekap data asesor serta jumlah peserta yang ditangani
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {handleApiError(error).message}
          </Alert>
        )}


        <DataTable
          columns={columnsAsesor}
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
          totalCount={pagination.totalItems}
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
