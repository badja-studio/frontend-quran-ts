import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import { filterConfigs } from "./config-filter";
import { columnsPeserta } from "./colum-table";
import { DataPerseta } from "./type";
import userService from "../../../services/user.service";

export default function ListPagesDataPesertaSiapAssement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState<DataPerseta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await userService.getAssesseesReadyForAssessment({
                page: pagination.page,
                limit: pagination.limit,
                search: searchQuery,
                sortBy: 'createdAt',
                sortOrder: 'DESC'
            });

            if (response.success) {
                const transformedData: DataPerseta[] = response.data.assessees.map((user, index) => ({
                    id: index + 1,
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
                }));

                setData(transformedData);
                setPagination(response.data.pagination);
            }
        } catch (err: any) {
            setError(err.message || 'Gagal memuat data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagination.page, pagination.limit, searchQuery]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleFiltersApplied = (_appliedFilters: FilterItem[]) => {
        // Filters can be applied here if needed
    };

    if (loading && data.length === 0) {
        return (
            <DashboardLayout userRole="admin" userName="Ustadz Ahmad" userEmail="ahmad@quran.app">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress />
                </Box>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout userRole="admin" userName="Ustadz Ahmad" userEmail="ahmad@quran.app">
            <Box>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Data Peserta Siap Asesmen
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Peserta yang telah siap untuk mengikuti asesmen kompetensi
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                <DataTable
                    columns={columnsPeserta}
                    data={data}
                    initialRowsPerPage={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    emptyMessage={loading ? "Memuat data..." : "Belum ada peserta siap asesmen"}
                    enableFilter={true}
                    filterConfigs={filterConfigs}
                    onFiltersApplied={handleFiltersApplied}
                    enableSearch={true}
                    searchValue={searchQuery}
                    onSearchChange={handleSearchChange}
                    searchPlaceholder="Cari peserta (nama, NIS, kelas, dll)..."
                    enableExport={true}
                />

                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    Halaman {pagination.page} dari {pagination.totalPages} | Total: {pagination.total} peserta
                </Typography>
            </Box>
        </DashboardLayout>
    )
}