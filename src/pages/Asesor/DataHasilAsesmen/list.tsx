// ListAsesorPagesDataPesertaHasilAsesmen.tsx
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import DataTable, { FilterItem } from "../../../components/Table/DataTable";
import { filterConfigs } from "./config-filter";
import { columnsPeserta } from "./colum-table";
import useUserStore from "../../../store/user.store";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../services/api.config";
import { DataPesertaHasilAssesment, GetUsersResponse, User } from "./type";
import AsesmenResultModal from "../../../components/Peserta/AsesmenResultModal";
import { dummyAssessments } from "./dummy";

interface AsesmenItem {
  nama: string;
  nip?: string;
  asesmen?: any[];
  asesor?: string;
  waktu?: string;
  status?: string;
  linkWa?: string;
}

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
  const [selectedAsesmen, setSelectedAsesmen] = useState<AsesmenItem | null>(
    null
  );

  const pesertaData = [
    {
      id: 1,
      nama: "Ahmad Zaki",
      nip: "123456",
      asesmen: dummyAssessments,
      onDetailClick: (row: any) => {
        setSelectedAsesmen(row);
        setModalVisible(true);
      },
    },
    {
      id: 2,
      nama: "Siti Aminah",
      nip: "654321",
      asesmen: dummyAssessments,
      onDetailClick: (row: any) => {
        setSelectedAsesmen(row);
        setModalVisible(true);
      },
    },
  ];

  const {
    data: response,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      "data-hasil-asesmen-admin",
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

      const formattedFilters: Array<{
        field: string;
        op: string;
        value: string | number | Date | string[];
      }> = [{ field: "status", op: "eq", value: "SUDAH" }];

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

      if (isInitialLoad) setIsInitialLoad(false);

      return result.data;
    },
    retry: 1,
    staleTime: 30000,
  });

  const transformedData: DataPesertaHasilAssesment[] =
    response?.data?.map(
      (user: User): DataPesertaHasilAssesment => ({
        id: parseInt(user.id),
        no_akun: user.no_akun || "-",
        nip: user.nip || "-",
        nama: user.nama,
        jk: user.jenis_kelamin === "L" ? "L" : "P",
        usia: user.usia,
        pegawai: user.pegawai,
        jenjang: user.jenjang || "-",
        level: user.level || "-",
        provinsi: user.provinsi || "-",
        kab_kota: user.kab_kota || "-",
        sekolah: user.sekolah || "-",
        pendidikan: user.pendidikan || "-",
        program_studi: user.prodi || "-",
        perguruan_tinggi: user.perguruan_tinggi || "-",
        jenis_pt: user.jenis_pt || "-",
        tahun_lulus: user.tahun_lulus?.toString() || "-",
        asesor: user.assessor?.name || "-",
        waktu: user.jadwal || "-",
        makhraj: 0,
        sifat: 0,
        ahkam: 0,
        mad: 0,
        gharib: 0,
      })
    ) || [];

  const pagination = response?.pagination || {
    current_page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  };

  useEffect(() => {
    fetchUser();
  }, [user, fetchUser]);

  const handleDetailClick = (row: any) => {
    setSelectedAsesmen(row);
    setModalVisible(true);
  };

  const dataWithHandlers = transformedData.map((item) => ({
    ...item,
    onDetailClick: handleDetailClick,
  }));

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

  // ======= RENDER =======
  return (
    <DashboardLayout
      userRole="assessor"
      userName={`${user?.name}`}
      userEmail={`${user?.email}`}
    >
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Data Peserta Selesai Asesmen
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Lihat hasil dan status peserta yang telah menyelesaikan asesmen
        </Typography>

        <DataTable
          columns={columnsPeserta}
          data={dataWithHandlers}
          rowsPerPageOptions={[5, 10, 25]}
          emptyMessage={
            isFetching
              ? "Memuat data..."
              : "Belum ada peserta dengan hasil asesmen"
          }
          enableFilter={true}
          filterConfigs={filterConfigs}
          onFiltersApplied={(f) => {
            setFilters(f);
            setPage(1);
          }}
          enableSearch={true}
          searchValue={searchQuery}
          onSearchChange={(v) => {
            setSearchQuery(v);
            setPage(1);
          }}
          enableExport={true}
          serverSide={true}
          totalCount={pagination.total}
          page={page - 1}
          rowsPerPage={limit}
          onPageChange={(newPage) => setPage(newPage + 1)}
          onRowsPerPageChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={(col) => {
            if (sortBy === col)
              setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
            else {
              setSortBy(col);
              setSortOrder("DESC");
            }
            setPage(1);
          }}
        />

        {selectedAsesmen && (
          <AsesmenResultModal
            open={modalVisible}
            onClose={() => setModalVisible(false)}
            pesertaName={selectedAsesmen.nama}
            asesorName={selectedAsesmen.asesor || "Ustadz Fauzan"}
            waktuPelaksanaan={selectedAsesmen.waktu || "26 Nov 2025"}
            nilaiAkhir={(() => {
              const semuaNilai = (selectedAsesmen.asesmen || []).map(
                (a) => a.nilai || 0
              );
              return semuaNilai.length
                ? semuaNilai.reduce((acc, n) => acc + n, 0) / semuaNilai.length
                : 0;
            })()}
            sections={[
              {
                title: "Makharijul Huruf",
                list: (selectedAsesmen.asesmen || [])
                  .filter((a) => a.kategori === "makhraj")
                  .map((a) => ({ simbol: a.huruf, nilai: a.nilai })),
              },
              {
                title: "Shifatul Huruf",
                list: (selectedAsesmen.asesmen || [])
                  .filter((a) => a.kategori === "sifat")
                  .map((a) => ({ simbol: a.huruf, nilai: a.nilai })),
              },
              {
                title: "Ahkam Al-Huruf",
                list: (selectedAsesmen.asesmen || [])
                  .filter((a) => a.kategori === "ahkam")
                  .map((a) => ({ simbol: a.huruf, nilai: a.nilai })),
              },
              {
                title: "Ahkam Al-Mad wa Qashr",
                list: (selectedAsesmen.asesmen || [])
                  .filter((a) => a.kategori === "mad")
                  .map((a) => ({ simbol: a.huruf, nilai: a.nilai })),
              },
              {
                title: "Gharib",
                list: (selectedAsesmen.asesmen || [])
                  .filter((a) => a.kategori === "gharib")
                  .map((a) => ({ simbol: a.huruf, nilai: a.nilai })),
              },
            ]}
          />
        )}
      </Box>
    </DashboardLayout>
  );
}
