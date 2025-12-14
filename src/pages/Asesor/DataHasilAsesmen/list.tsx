import { useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import ExportButton from "../../../components/Export/ExportButton";
import AsesmenResultModal from "../../../components/Peserta/AsesmenResultModal";
import { filterConfigs } from "./config-filter";
import { columnsPeserta } from "./colum-table";
import apiClient, { handleApiError } from "../../../services/api.config";
import {
  DataPersetaHasil,
  GetUsersResponse,
  ApiAssessmentItem,
  QuizSection,
} from "./type";
import { useQuery } from "@tanstack/react-query";
import { useUserProfile } from "../../../hooks/useUserProfile";

const dataQuiz: Record<string, QuizSection["list"]> = {
  makhraj: [
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
    "Dlammah",
    "Kasrah",
    "Fathah",
    "ي",
    "ء",
    "هـ",
    "و",
    "ن",
    "Tasydid",
    "Dlammatain",
    "Kasratain",
    "Fathatain",
    "Sukun",
  ],
  sifat: [
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
  ahkam: [
    "Tanaffus",
    "Izhhar",
    "Idzgham Bighunnah",
    "Idzgham Bilaghunnah",
    "Ikhfa’",
    "Iqlab",
    "Izhhar Syafawi",
    "Ikhfa’ Syafawi",
    "Idgham Mutamtsilain ",
    "Idzgham Mutajannisain",
    "Idgham Mutaqaribain",
    "Ghunnah Musyaddadah",
  ],
  mad: [
    "Mad Thabi’i",
    "Mad Wajib Muttashil",
    "Mad Jaiz Munfashil",
    "Mad Iwadz",
    "Mad Lin",
    "Mad Aridlissukun",
    "Mad Tamkin",
    "Mad Farq",
    "Mad LK Mutsaqqal",
    "Mad LK Mukhaffaf",
    "Mad LH Mutsaqqal",
    "Mad LH Mukhaffaf",
    "Mad Badal",
    "Mad Shilah Qashirah",
    "Mad Shilah Thawilah",
    "Qashr",
  ],
  gharib: [
    "Iysmam",
    "Imalah",
    "Tashil",
    "Ibdal",
    "Naql",
    "Badal",
    "Nun Washal",
  ],
  kelancaran: ["Tidak Lancar", "Kurang Lancar"],
  pengurangan: ["Tidak Bisa Baca"],
};

export default function ListAsesorPagesDataPesertaHasilAsesmen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const { data: user } = useUserProfile();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAsesmen, setSelectedAsesmen] =
    useState<DataPersetaHasil | null>(null);

  const handleDetailClick = (row: DataPersetaHasil) => {
    setSelectedAsesmen(row);
    setModalVisible(true);
    setTimeout(() => {
      fetchDetail();
    }, 0);
  };

  // Fetch data with React Query
  const {
    data: response,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [
      "data-hasil-asesmen-admin-asesor",
      page,
      limit,
      searchQuery,
      sortBy,
      sortOrder,
      filters,
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
        {
          field: "asesor_id",
          op: "eq",
          value: user?.id || "",
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
      console.log(result.data);
      return result.data;
    },
    enabled: !!user?.id,
    retry: 1,
    staleTime: 30000, // 30 seconds
  });

  // 🔥 Inject handler
  const transformedData =
    response?.data.map((item) => ({
      id: item.id,
      nik: item.nik || "",
      username: item.akun?.username || "",
      email: item.email || "",
      no_handphone: item.no_handphone || "",
      nama: item.nama || "",
      jenis_kelamin: item.jenis_kelamin || "",
      tempat_lahir: item.tempat_lahir || "",
      tanggal_lahir: item.tanggal_lahir || "",
      jenjang: item.jenjang || "",
      sekolah: item.sekolah || "",
      alamat_sekolah: item.alamat_sekolah || "",
      provinsi: item.provinsi || "",
      kota: item.kota || "",
      kecamatan: item.kecamatan || "",
      kelurahan: item.kelurahan || "",
      status_pegawai: item.status_pegawai || "",
      pendidikan: item.pendidikan || "",
      perguruan_tinggi: item.perguruan_tinggi || "",
      fakultas: item.fakultas || "",
      prodi: item.prodi || "",
      tahun_lulus: Number(item.tahun_lulus) || 0,
      pegawai: item.pegawai || "",
      sertifikasi: item.sertifikasi || "",
      tahun_sertifikasi: item.tahun_sertifikasi || "",
      mapel: item.mapel || "",
      jadwal: item.jadwal || "",
      asesor: item.assessor?.name || "",
      makhraj: item.scoring?.scores.makhraj || 0,
      sifat: item.scoring?.scores.sifat || 0,
      ahkam: item.scoring?.scores.ahkam || 0,
      mad: item.scoring?.scores.mad || 0,
      gharib: item.scoring?.scores.gharib || 0,
      kelancaran: item.scoring?.scores.kelancaran || 0,
      pengurangan: item.scoring?.scores.pengurangan || 0,
      total: item.scoring?.scores.overall || 0,
      onDetailClick: handleDetailClick,
    })) || [];

  const pagination = response?.pagination || {
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  };

  const { data: asesmenDetail, refetch: fetchDetail } = useQuery({
    queryKey: ["asesmen-detail-asesor", selectedAsesmen?.id],
    queryFn: async ({ queryKey }) => {
      const [, participantId] = queryKey;
      if (!participantId) return { data: [] };

      const res = await apiClient.get(
        `/api/assessments/participant/${participantId}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      return { data: res.data.data || [] };
    },
    enabled: false,
  });

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

  const mapDetailToSections = (
    detail: { data: ApiAssessmentItem[] } | null | undefined
  ) => {
    const defaultSections = [
      { title: "Makharijul Huruf", list: dataQuiz.makhraj },
      { title: "Shifatul Huruf", list: dataQuiz.sifat },
      { title: "Ahkam Al-Huruf", list: dataQuiz.ahkam },
      { title: "Ahkam Al-Mad wa Qashr", list: dataQuiz.mad },
      { title: "Gharib", list: dataQuiz.gharib },
      { title: "Kelancaran", list: dataQuiz.kelancaran },
      { title: "Pengurangan", list: dataQuiz.pengurangan },
    ];

    if (!detail?.data?.length) return defaultSections;

    const grouped: Record<string, { simbol: string; nilai: number }[]> = {};

    detail.data.forEach((item: ApiAssessmentItem) => {
      if (!grouped[item.kategori]) grouped[item.kategori] = [];
      grouped[item.kategori].push({
        simbol: item.huruf,
        nilai: parseFloat(item.nilai),
      });
    });

    return defaultSections.map((sec) => {
      const key = sec.title.toLowerCase().includes("makharij")
        ? "makhraj"
        : sec.title.toLowerCase().includes("shifat")
        ? "sifat"
        : sec.title.toLowerCase().includes("ahkam al-huruf")
        ? "ahkam"
        : sec.title.toLowerCase().includes("mad")
        ? "mad"
        : sec.title.toLowerCase().includes("gharib")
        ? "gharib"
        : sec.title.toLowerCase().includes("kelancaran")
        ? "kelancaran"
        : sec.title.toLowerCase().includes("pengurangan")
        ? "pengurangan"
        : "";

      if (!key || !grouped[key]) return sec;

      const list = sec.list.map((item) => {
        const simbol = typeof item === "string" ? item : item.simbol;
        const found = grouped[key].find((i) => i.simbol === simbol);
        return { simbol, nilai: found?.nilai ?? 0 };
      });

      return { ...sec, list };
    });
  };

  const safeSections = mapDetailToSections(asesmenDetail) || [];
  const totalSelesai = pagination.total || 0;

  // Full screen loading hanya di awal
  if (isInitialLoad && isLoading) {
    return (
      <DashboardLayout
        userRole="assessor"
        userName={`${user?.name}`}
        userEmail={`${user?.email}`}
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
      userName={`${user?.name}`}
      userEmail={`${user?.email}`}
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
            <Typography variant="h4" fontWeight="bold">
              Data Peserta Selesai Asesmen
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Lihat hasil dan status peserta yang telah menyelesaikan asesmen
            </Typography>

            <Box
              sx={{
                mt: 1,
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 0.75,
                borderRadius: 2,
                bgcolor: "grey.100",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Total peserta selesai diuji
              </Typography>

              <Typography variant="h6" fontWeight="bold" color="primary.main">
                {totalSelesai}
              </Typography>
            </Box>
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
            isFetching
              ? "Memuat data..."
              : "Belum ada peserta dengan hasil asesmen"
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
            pesertaName={selectedAsesmen.nama || "Peserta"}
            asesorName={selectedAsesmen.asesor || "Ustadz/ah"}
            waktuPelaksanaan={selectedAsesmen.jadwal || "26 Nov 2025"}
            nilaiAkhir={selectedAsesmen?.total || 0}
            sections={safeSections}
            categoryScores={{
              makhraj: selectedAsesmen.makhraj || 0,
              sifat: selectedAsesmen.sifat || 0,
              ahkam: selectedAsesmen.ahkam || 0,
              mad: selectedAsesmen.mad || 0,
              gharib: selectedAsesmen.gharib || 0,
              kelancaran: selectedAsesmen.kelancaran || 0,
              pengurangan: selectedAsesmen.pengurangan || 0,
            }}
          />
        )}
      </Box>
    </DashboardLayout>
  );
}
