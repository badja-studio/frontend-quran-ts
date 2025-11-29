import { useState } from "react";
import { Box, Typography, CircularProgress, Alert, LinearProgress } from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import { filterConfigs } from "./config-filter";
import { columnsPeserta } from "./colum-table";
import { DataPesertaBelomAsesment, GetUsersResponse } from "./type";
import apiClient, { handleApiError } from "../../../services/api.config";
import { useQuery } from "@tanstack/react-query";


export default function ListPagesDataPesertaBelomAsesmen() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<FilterItem[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");

    // Fetch data with React Query
    const {
        data: response,
        isLoading,
        isFetching,
        error,
    } = useQuery({
        queryKey: ["users", page, limit, searchQuery, sortBy, sortOrder, filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append("page", page.toString());
            params.append("limit", limit.toString());
            if (searchQuery) params.append("search", searchQuery);
            params.append("sortBy", sortBy);
            params.append("sortOrder", sortOrder);

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
                'in': 'in'
            };

            // Inject default filter untuk jadwal (tanggal hari ini)
            const formattedFilters: Array<{
                field: string;
                op: string;
                value: string | number | Date | string[];
            }> = [
                    {
                        field: 'status',
                        op: 'eq',
                        value: "BELUM"
                    }
                ];

            // Gabungkan dengan user filters
            if (filters.length > 0) {
                const userFilters = filters.map(filter => ({
                    field: filter.key,
                    op: operatorMap[filter.operator] || filter.operator,
                    value: filter.value
                }));
                formattedFilters.push(...userFilters);
            }

            params.append("filters", JSON.stringify(formattedFilters));

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

    // Transform data untuk table
    const transformedData: DataPesertaBelomAsesment[] =
        response?.data?.map((user) => ({
            id: user.id,
            no_akun: user.no_akun || "-",
            nip: user.nip || "-",
            nama: user.nama,
            jenis_kelamin: user.jenis_kelamin || "L",
            usia: user.usia || 0,
            pegawai: user.pegawai || "-",
            jenjang: user.jenjang || "-",
            level: user.level || "-",
            provinsi: user.provinsi || "-",
            kab_kota: user.kab_kota || "-",
            sekolah: user.sekolah || "-",
            jadwal: user.jadwal || "-",
            asesor: user.assessor?.name || "-",
        })) || [];

    const pagination = response?.pagination || {
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
                userRole="admin"
                userName="Ustadz Ahmad"
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
        <DashboardLayout userRole="admin" userName="Ustadz Ahmad" userEmail="ahmad@quran.app">
            <Box>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Data Peserta Belum Asesmen
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Kelola pendaftaran dan verifikasi data peserta yang belum mengikuti asesmen
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
                    // Server-side sorting
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortChange={handleSortChange}
                />
            </Box>
        </DashboardLayout>
    )
}