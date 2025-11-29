import { useState } from "react";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DataTable, {
  Column,
  FilterConfig,
  FilterItem,
  ExportType,
} from "../../components/Table/DataTable";
import { formatStatus } from "../../components/Table/tableFormatters";
import * as XLSX from "xlsx";

// Interface untuk data siswa
interface Siswa extends Record<string, unknown> {
  id: number;
  nama: string;
  kelas: string;
  email: string;
  hafalan: number;
  status: string;
  nilai: number;
  // Tambahan kolom untuk testing
  nis: string;
  jenisKelamin: string;
  tanggalLahir: string;
  alamat: string;
  noTelp: string;
  namaWali: string;
  pekerjaanWali: string;
  nilaiTajwid: number;
  nilaiTahfidz: number;
  nilaiTafsir: number;
  nilaiAkhlak: number;
  kehadiran: number;
  prestasi: string;
  catatan: string;
}

// Data dummy siswa dengan banyak kolom
const dataSiswa: Siswa[] = [
  {
    id: 1,
    nama: "Muhammad Ali",
    kelas: "Tahfidz A",
    email: "mali@email.com",
    hafalan: 15,
    status: "Aktif",
    nilai: 85,
    nis: "2023001",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2010-05-15",
    alamat: "Jl. Masjid No. 10, Jakarta",
    noTelp: "081234567890",
    namaWali: "Bapak Ali Rahman",
    pekerjaanWali: "Pedagang",
    nilaiTajwid: 88,
    nilaiTahfidz: 85,
    nilaiTafsir: 82,
    nilaiAkhlak: 90,
    kehadiran: 95,
    prestasi: "Juara 1 Tahfidz",
    catatan: "Siswa berprestasi",
  },
  {
    id: 2,
    nama: "Fatimah Zahra",
    kelas: "Tahfidz A",
    email: "fatimah@email.com",
    hafalan: 20,
    status: "Aktif",
    nilai: 92,
    nis: "2023002",
    jenisKelamin: "Perempuan",
    tanggalLahir: "2010-08-20",
    alamat: "Jl. Pesantren No. 5, Bogor",
    noTelp: "081234567891",
    namaWali: "Ibu Zahra",
    pekerjaanWali: "Guru",
    nilaiTajwid: 92,
    nilaiTahfidz: 95,
    nilaiTafsir: 90,
    nilaiAkhlak: 95,
    kehadiran: 98,
    prestasi: "Juara 1 Musabaqah",
    catatan: "Sangat rajin",
  },
  {
    id: 3,
    nama: "Ahmad Ibrahim",
    kelas: "Tahfidz B",
    email: "ahmad@email.com",
    hafalan: 12,
    status: "Aktif",
    nilai: 78,
    nis: "2023003",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2011-03-10",
    alamat: "Jl. Damai No. 15, Depok",
    noTelp: "081234567892",
    namaWali: "Bapak Ibrahim",
    pekerjaanWali: "PNS",
    nilaiTajwid: 75,
    nilaiTahfidz: 78,
    nilaiTafsir: 80,
    nilaiAkhlak: 85,
    kehadiran: 90,
    prestasi: "-",
    catatan: "Perlu bimbingan tajwid",
  },
  {
    id: 4,
    nama: "Khadijah Aisyah",
    kelas: "Tahfidz A",
    email: "khadijah@email.com",
    hafalan: 18,
    status: "Aktif",
    nilai: 88,
    nis: "2023004",
    jenisKelamin: "Perempuan",
    tanggalLahir: "2010-12-25",
    alamat: "Jl. Harmoni No. 8, Tangerang",
    noTelp: "081234567893",
    namaWali: "Ibu Aisyah",
    pekerjaanWali: "Wiraswasta",
    nilaiTajwid: 90,
    nilaiTahfidz: 88,
    nilaiTafsir: 85,
    nilaiAkhlak: 92,
    kehadiran: 96,
    prestasi: "Juara 3 Tartil",
    catatan: "Baik",
  },
  {
    id: 5,
    nama: "Umar bin Khattab",
    kelas: "Tahfidz B",
    email: "umar@email.com",
    hafalan: 10,
    status: "Menunggu",
    nilai: 75,
    nis: "2023005",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "2011-07-18",
    alamat: "Jl. Sejahtera No. 20, Bekasi",
    noTelp: "081234567894",
    namaWali: "Bapak Umar",
    pekerjaanWali: "Sopir",
    nilaiTajwid: 72,
    nilaiTahfidz: 75,
    nilaiTafsir: 78,
    nilaiAkhlak: 80,
    kehadiran: 85,
    prestasi: "-",
    catatan: "Perlu motivasi",
  },
];

export default function GuruSiswa() {
  const [searchQuery, setSearchQuery] = useState("");

  // Define columns untuk table siswa (20 kolom)
  const columns: Column<Siswa>[] = [
    {
      id: "nis",
      label: "NIS",
      minWidth: 100,
      align: "center",
    },
    {
      id: "nama",
      label: "Nama Siswa",
      minWidth: 200,
      format: (value, row) => {
        const nama = String(value);
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
              {nama.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {nama}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {row.email}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      id: "jenisKelamin",
      label: "Jenis Kelamin",
      minWidth: 120,
      align: "center",
      format: (value) => {
        const jk = String(value);
        return (
          <Chip
            label={jk}
            size="small"
            color={jk === "Laki-laki" ? "primary" : "secondary"}
          />
        );
      },
    },
    {
      id: "tanggalLahir",
      label: "Tanggal Lahir",
      minWidth: 130,
      align: "center",
      format: (value) => {
        const date = new Date(String(value));
        return date.toLocaleDateString("id-ID");
      },
    },
    {
      id: "kelas",
      label: "Kelas",
      minWidth: 120,
      align: "center",
    },
    {
      id: "alamat",
      label: "Alamat",
      minWidth: 250,
    },
    {
      id: "noTelp",
      label: "No. Telepon",
      minWidth: 130,
      align: "center",
    },
    {
      id: "namaWali",
      label: "Nama Wali",
      minWidth: 180,
    },
    {
      id: "pekerjaanWali",
      label: "Pekerjaan Wali",
      minWidth: 150,
    },
    {
      id: "hafalan",
      label: "Hafalan (Juz)",
      minWidth: 120,
      align: "center",
      format: (value) => {
        const hafalan = Number(value);
        return (
          <Chip
            label={`${hafalan} Juz`}
            size="small"
            color="primary"
            variant="outlined"
          />
        );
      },
    },
    {
      id: "nilaiTajwid",
      label: "Nilai Tajwid",
      minWidth: 110,
      align: "center",
      format: (value) => {
        const nilai = Number(value);
        let color: "success" | "warning" | "error" = "success";
        if (nilai < 70) color = "error";
        else if (nilai < 85) color = "warning";
        return <Chip label={nilai} size="small" color={color} />;
      },
    },
    {
      id: "nilaiTahfidz",
      label: "Nilai Tahfidz",
      minWidth: 110,
      align: "center",
      format: (value) => {
        const nilai = Number(value);
        let color: "success" | "warning" | "error" = "success";
        if (nilai < 70) color = "error";
        else if (nilai < 85) color = "warning";
        return <Chip label={nilai} size="small" color={color} />;
      },
    },
    {
      id: "nilaiTafsir",
      label: "Nilai Tafsir",
      minWidth: 110,
      align: "center",
      format: (value) => {
        const nilai = Number(value);
        let color: "success" | "warning" | "error" = "success";
        if (nilai < 70) color = "error";
        else if (nilai < 85) color = "warning";
        return <Chip label={nilai} size="small" color={color} />;
      },
    },
    {
      id: "nilaiAkhlak",
      label: "Nilai Akhlak",
      minWidth: 110,
      align: "center",
      format: (value) => {
        const nilai = Number(value);
        let color: "success" | "warning" | "error" = "success";
        if (nilai < 70) color = "error";
        else if (nilai < 85) color = "warning";
        return <Chip label={nilai} size="small" color={color} />;
      },
    },
    {
      id: "nilai",
      label: "Nilai Rata-rata",
      minWidth: 120,
      align: "center",
      format: (value) => {
        const nilai = Number(value);
        let color: "success" | "warning" | "error" = "success";
        if (nilai < 70) color = "error";
        else if (nilai < 85) color = "warning";

        return (
          <Chip
            label={nilai}
            size="small"
            color={color}
            sx={{ fontWeight: "bold" }}
          />
        );
      },
    },
    {
      id: "kehadiran",
      label: "Kehadiran (%)",
      minWidth: 120,
      align: "center",
      format: (value) => {
        const kehadiran = Number(value);
        let color: "success" | "warning" | "error" = "success";
        if (kehadiran < 75) color = "error";
        else if (kehadiran < 90) color = "warning";
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight="medium">
              {kehadiran}%
            </Typography>
            <Chip
              label=""
              size="small"
              color={color}
              sx={{ width: 8, height: 8, minWidth: 8 }}
            />
          </Box>
        );
      },
    },
    {
      id: "prestasi",
      label: "Prestasi",
      minWidth: 180,
    },
    {
      id: "catatan",
      label: "Catatan",
      minWidth: 200,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      align: "center",
      format: (value) => formatStatus(String(value)),
    },
  ];

  const handleRowClick = (row: Siswa) => {
    console.log("Clicked row:", row);
    // Bisa navigate ke detail siswa atau buka modal
    // navigate(`/dashboard/siswa/${row.id}`);
  };

  const handleFiltersApplied = (appliedFilters: FilterItem[]) => {
    console.log("Applied Filters for API:", appliedFilters);
    // TODO: Gunakan filters ini untuk API call
    // Example API call:
    // fetchStudents({ filters: appliedFilters });

    // Format yang bisa digunakan untuk API:
    // appliedFilters = [
    //   { id: '123', key: 'nama', operator: 'contains', value: 'Ahmad', type: 'text' },
    //   { id: '456', key: 'nilai', operator: 'greaterThan', value: 80, type: 'number' },
    // ]
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    console.log("Search Query for API:", value);
    // TODO: Gunakan search query ini untuk API call
    // fetchStudents({ search: value });
  };

  const handleExport = (type: ExportType, data: Siswa[]) => {
    console.log(`Export ${type}:`, data);

    if (type === "excel") {
      // Prepare data untuk export (remove unwanted fields dan format)
      const exportData = data.map((row) => ({
        NIS: row.nis,
        Nama: row.nama,
        "Jenis Kelamin": row.jenisKelamin,
        "Tanggal Lahir": row.tanggalLahir,
        Kelas: row.kelas,
        Alamat: row.alamat,
        "No. Telepon": row.noTelp,
        "Nama Wali": row.namaWali,
        "Pekerjaan Wali": row.pekerjaanWali,
        "Hafalan (Juz)": row.hafalan,
        "Nilai Tajwid": row.nilaiTajwid,
        "Nilai Tahfidz": row.nilaiTahfidz,
        "Nilai Tafsir": row.nilaiTafsir,
        "Nilai Akhlak": row.nilaiAkhlak,
        "Nilai Rata-rata": row.nilai,
        "Kehadiran (%)": row.kehadiran,
        Prestasi: row.prestasi,
        Catatan: row.catatan,
        Status: row.status,
      }));

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Set column widths
      const colWidths = [
        { wch: 12 }, // NIS
        { wch: 20 }, // Nama
        { wch: 15 }, // Jenis Kelamin
        { wch: 15 }, // Tanggal Lahir
        { wch: 15 }, // Kelas
        { wch: 30 }, // Alamat
        { wch: 15 }, // No. Telepon
        { wch: 20 }, // Nama Wali
        { wch: 18 }, // Pekerjaan Wali
        { wch: 15 }, // Hafalan
        { wch: 12 }, // Nilai Tajwid
        { wch: 12 }, // Nilai Tahfidz
        { wch: 12 }, // Nilai Tafsir
        { wch: 12 }, // Nilai Akhlak
        { wch: 15 }, // Nilai Rata-rata
        { wch: 15 }, // Kehadiran
        { wch: 20 }, // Prestasi
        { wch: 25 }, // Catatan
        { wch: 12 }, // Status
      ];
      ws["!cols"] = colWidths;

      // Create workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data Siswa");

      // Generate file name with date
      const date = new Date().toISOString().split("T")[0];
      const fileName = `Data_Siswa_${date}.xlsx`;

      // Download file
      XLSX.writeFile(wb, fileName);

      console.log("Excel exported:", fileName);
    } else if (type === "pdf") {
      // TODO: Implement PDF export using jsPDF or similar library
      alert("Fitur Export PDF akan segera hadir!");
    } else if (type === "print") {
      // Print functionality
      window.print();
    }
  };

  // Filter configuration
  const filterConfigs: FilterConfig<Siswa>[] = [
    {
      key: "nis",
      label: "NIS",
      type: "text",
      operators: ["equals", "contains", "startsWith"],
    },
    {
      key: "nama",
      label: "Nama Siswa",
      type: "text",
      operators: ["contains", "startsWith", "endsWith"],
    },
    {
      key: "jenisKelamin",
      label: "Jenis Kelamin",
      type: "select",
      options: [
        { label: "Laki-laki", value: "Laki-laki" },
        { label: "Perempuan", value: "Perempuan" },
      ],
    },
    {
      key: "kelas",
      label: "Kelas",
      type: "select",
      options: [
        { label: "Tahfidz A", value: "Tahfidz A" },
        { label: "Tahfidz B", value: "Tahfidz B" },
      ],
    },
    {
      key: "hafalan",
      label: "Hafalan (Juz)",
      type: "number",
      operators: [
        "equals",
        "greaterThan",
        "lessThan",
        "greaterThanOrEqual",
        "lessThanOrEqual",
      ],
    },
    {
      key: "nilaiTajwid",
      label: "Nilai Tajwid",
      type: "number",
      operators: [
        "equals",
        "greaterThan",
        "lessThan",
        "greaterThanOrEqual",
        "lessThanOrEqual",
      ],
    },
    {
      key: "nilaiTahfidz",
      label: "Nilai Tahfidz",
      type: "number",
      operators: [
        "equals",
        "greaterThan",
        "lessThan",
        "greaterThanOrEqual",
        "lessThanOrEqual",
      ],
    },
    {
      key: "nilaiTafsir",
      label: "Nilai Tafsir",
      type: "number",
      operators: [
        "equals",
        "greaterThan",
        "lessThan",
        "greaterThanOrEqual",
        "lessThanOrEqual",
      ],
    },
    {
      key: "nilaiAkhlak",
      label: "Nilai Akhlak",
      type: "number",
      operators: [
        "equals",
        "greaterThan",
        "lessThan",
        "greaterThanOrEqual",
        "lessThanOrEqual",
      ],
    },
    {
      key: "nilai",
      label: "Nilai Rata-rata",
      type: "number",
      operators: [
        "equals",
        "greaterThan",
        "lessThan",
        "greaterThanOrEqual",
        "lessThanOrEqual",
      ],
    },
    {
      key: "kehadiran",
      label: "Kehadiran (%)",
      type: "number",
      operators: [
        "equals",
        "greaterThan",
        "lessThan",
        "greaterThanOrEqual",
        "lessThanOrEqual",
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Aktif", value: "Aktif" },
        { label: "Menunggu", value: "Menunggu" },
        { label: "Nonaktif", value: "Nonaktif" },
      ],
    },
    {
      key: "tanggalLahir",
      label: "Tanggal Lahir",
      type: "date",
    },
  ];

  return (
    <DashboardLayout
      userRole="guru"
      userName="Ustadz Ahmad"
      userEmail="ahmad@quran.app"
    >
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Daftar Siswa
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Kelola dan pantau progress siswa Anda
        </Typography>

        <DataTable
          columns={columns}
          data={dataSiswa}
          initialRowsPerPage={10}
          rowsPerPageOptions={[5, 10, 25]}
          onRowClick={handleRowClick}
          emptyMessage="Belum ada data siswa"
          enableFilter={true}
          filterConfigs={filterConfigs}
          onFiltersApplied={handleFiltersApplied}
          enableSearch={true}
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Cari siswa (nama, NIS, kelas, dll)..."
          enableExport={true}
          onExport={handleExport}
        />
      </Box>
    </DashboardLayout>
  );
}
