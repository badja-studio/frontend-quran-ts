import { useState } from "react";
import { Box, Typography, CircularProgress, Alert, LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import { filterConfigs } from "./config-filter";
import { columnsPeserta } from "./colum-table";
import { DataPerseta, GetUsersResponse } from "./type";
import { api, handleApiError } from "../../../services/api.config";

export default function ListPagesDataPeserta() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<FilterItem[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Fetch data with React Query
    const { data: response, isLoading, isFetching, error } = useQuery({
        queryKey: ['users', page, limit, searchQuery],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('page', page.toString());
            params.append('limit', limit.toString());
            if (searchQuery) params.append('search', searchQuery);
            params.append('sortBy', 'createdAt');
            params.append('sortOrder', 'DESC');

            const result = await api.get<GetUsersResponse>(`/v1/users?${params.toString()}`);

            // Setelah load pertama selesai
            if (isInitialLoad) {
                setIsInitialLoad(false);
            }

            return result;
        },
        retry: 1,
        staleTime: 30000, // 30 seconds
    });

    // Transform data untuk table
    const transformedData: DataPerseta[] = response?.data?.users?.map((user, index) => ({
        id: index + 1 + (page - 1) * limit,
        no_akun: user.accountNumber || '-',
        nip: user.nip || '-',
        nama: user.fullname || user.name,
        jk: user.gender || 'L',
        tl: user.birthPlace || '-',
        pegawai: user.position || '-',
        jenjang: user.schoolLevels || '-',
        level: user.levels || '-',
        provinsi: user.province || '-',
        kab_kota: user.district || '-',
        sekolah: user.schoolName || '-',
        pendidikan: user.education || '-',
        program_studi: user.studyProgram || '-',
        perguruan_tinggi: user.university || '-',
        jenis_pt: user.universityType || '-',
        tahun_lulus: user.graduationYear || '-',
        jadwal: '-',
        asesor: '-',
    })) || [];

    const pagination = response?.data?.pagination || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false
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
            <DashboardLayout userRole="admin" userName="Ustadz Ahmad" userEmail="ahmad@quran.app">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress />
                </Box>
            </DashboardLayout>
        );

        setData(transformedData);
        setPagination(response.data.pagination);
      }
    } catch (err: any) {
      setError(err.message || "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.limit, searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Reset to page 1 when searching
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleFiltersApplied = (appliedFilters: FilterItem[]) => {
    setFilters(appliedFilters);
  };

  if (loading && data.length === 0) {
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

                {/* Loading indicator untuk search/filter/pagination */}
                {isFetching && !isInitialLoad && (
                    <Box sx={{ width: '100%', mb: 2 }}>
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
                    emptyMessage={isFetching ? "Memuat data..." : "Belum ada data peserta"}
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
    )
}
