import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import ExportButton from "../../../components/Export/ExportButton";
import AsesmenResultModal from "../../../components/Peserta/AsesmenResultModal";
import { filterConfigs } from "./config-filter";
import { columnsPeserta } from "./colum-table";
import apiClient, { handleApiError } from "../../../services/api.config";
import { DataPersetaHasil, GetUsersResponse } from "./type";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "../../../store/user.store";

const dataQuiz = {
  makharij: [
    "د",
    "خ",
    "ح",
    "ج",
    "ث",
    "ت",
    "ب",
    "ا",
    "ط",
    "ض",
    "ص",
    "ش",
    "س",
    "ز",
    "ر",
    "ذ",
    "م",
    "ل",
    "ك",
    "ق",
    "ف",
    "غ",
    "ع",
    "ظ",
    { simbol: "ــُ", arti: "Dlammah" },
    { simbol: "ــِـ", arti: "Kasrah" },
    { simbol: "ــَـ", arti: "Fathah" },
    "ي",
    "ء",
    "هـ",
    "و",
    "ن",
    { simbol: "ــّـ", arti: "Tasydid" },
    { simbol: "ــٌـ", arti: "Dlammatain" },
    { simbol: "ــٍـ", arti: "Kasratain" },
    { simbol: "ــًـ", arti: "Fathatain" },
    { simbol: "ــْـ", arti: "Sukun" },
  ],
  shifat: [
    "د",
    "خ",
    "ح",
    "ج",
    "ث",
    "ت",
    "ب",
    "ا",
    "ط",
    "ض",
    "ص",
    "ش",
    "س",
    "ز",
    "ر",
    "ذ",
    "م",
    "ل",
    "ك",
    "ق",
    "ف",
    "غ",
    "ع",
    "ظ",
    "ي",
    "ء",
    "هـ",
    "و",
    "ن",
  ],
  ahkamHuruf: [
    "Izhhar",
    "Izhhar Syafawi",
    "Idzgham Bighunnah",
    "Ikhfa’ Syafawi",
    "Idzgham Bilaghunnah",
    "Idzgham Mimi",
    "Ikhfa’",
    "Idzgham Mutajannisain",
    "Iqlab",
    "Idzgham Mutaqarribain",
  ],
  ahkamMad: [
    "Mad Thabi’i",
    "Mad Lazim Kilmi Mutsaqqal",
    "Mad Wajib Muttashil",
    "Mad Lazim Kilmi Mukhaffaf",
    "Mad Jaiz Munfashil",
    "Mad Lazim Harfi Mutsaqqal",
    "Mad Iwadz",
    "Mad Lazim Harfi Mukhaffaf",
    "Mad Lin",
    "Mad Badal",
    "Mad Aridlissukun",
    "Mad Shilah Qashirah",
    "Mad Tamkin",
    "Mad Shilah Thawilah",
    "Mad Farq",
  ],
  gharib: [
    "Iysmam",
    "Imalah",
    "Saktah",
    "Tashil",
    "Naql",
    "Badal",
    "Mad dan Qashr",
  ],
};

export default function ListAsesorPagesDataPesertaHasilAsesmen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const { user, fetchUser } = useUserStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAsesmen, setSelectedAsesmen] = useState<DataPersetaHasil | null>(
    null
  );

  const handleDetailClick = (row: DataPersetaHasil) => {
    setSelectedAsesmen(row);
    setModalVisible(true);
  };

  // Fetch data with React Query
  const {
    data: response,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["data-hasil-asesmen-admin", page, limit, searchQuery, sortBy, sortOrder, filters],
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

      // Default filter untuk status SELESAI
      const formattedFilters: Array<{
        field: string;
        op: string;
        value: string | number | Date | string[];
      }> = [
          {
            field: "status",
            op: "eq",
            value: "SUDAH",
          },
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

  // 🔥 Inject handler
  const transformedData = response?.data.map((item) => ({
    id: item.id,
    no_akun: item.no_akun || "",
    nip: item.nip || "",
    nama: item.nama,
    jenis_kelamin: item.jenis_kelamin || "",
    tempat_lahir: item.tempat_lahir || "",
    pegawai: item.pegawai,
    jenjang: item.jenjang || "",
    level: item.level || "",
    provinsi: item.provinsi || "",
    kab_kota: item.kab_kota || "",
    sekolah: item.sekolah || "",
    pendidikan: item.pendidikan || "",
    prodi: item.prodi || "",
    perguruan_tinggi: item.perguruan_tinggi || "",
    jenis_pt: item.jenis_pt || "",
    tahun_lulus: item.tahun_lulus || 0,
    jadwal: item.jadwal || "",
    asesor: item.assessor?.name || "",
    makhraj: item.scoring?.scores.makhraj || 0,
    sifat: item.scoring?.scores.sifat || 0,
    ahkam: item.scoring?.scores.ahkam || 0,
    mad: item.scoring?.scores.mad || 0,
    gharib: item.scoring?.scores.gharib || 0,
    total: item.scoring?.scores.overall || 0,
    onDetailClick: handleDetailClick,
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
      userRole="asesor"
      userName={`${user?.name}`}
      userEmail="ahmad@quran.app"
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Data Peserta Selesai Asesmen
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Lihat hasil dan status peserta yang telah menyelesaikan asesmen
            </Typography>
          </Box>
          <ExportButton
            exportType="assessments"
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
          rowsPerPageOptions={[5, 10, 25]}
          emptyMessage={
            isFetching ? "Memuat data..." : "Belum ada peserta dengan hasil asesmen"
          }
          enableFilter={true}
          filterConfigs={filterConfigs}
          onFiltersApplied={handleFiltersApplied}
          enableSearch={true}
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Cari peserta (nama, NIS, kelas, dll)..."
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

        {selectedAsesmen && (
          <AsesmenResultModal
            open={modalVisible}
            onClose={() => setModalVisible(false)}
            pesertaName="Ahmad Zaki"
            asesorName="Ustadz Fauzan"
            waktuPelaksanaan="26 Nov 2025"
            nilaiAkhir={97.5}
            sections={[
              { title: "Makharijul Huruf", list: dataQuiz.makharij },
              { title: "Shifatul Huruf", list: dataQuiz.shifat },
              { title: "Ahkam Al-Huruf", list: dataQuiz.ahkamHuruf },
              { title: "Ahkam Al-Mad wa Qashr", list: dataQuiz.ahkamMad },
              { title: "Gharib", list: dataQuiz.gharib },
            ]}
          />
        )}
      </Box>
    </DashboardLayout>
  );
}
