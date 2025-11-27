import { DataPerseta } from "./type";
import { Column } from "../../../components/Table/DataTable";
import { Link } from "react-router-dom";
import { Box, Typography, Chip, Avatar } from "@mui/material";

export const dummyDataPeserta: DataPerseta[] = [
  {
    id: 1,
    no_akun: "A001",
    nip: "1987654321",
    nama: "Budi Santoso",
    jk: "L",
    tl: "Jakarta",
    pegawai: "Guru",
    jenjang: "SMA",
    level: "Senior",
    provinsi: "DKI Jakarta",
    kab_kota: "Jakarta Selatan",
    sekolah: "SMA Negeri 8",
    pendidikan: "S1",
    program_studi: "Pendidikan Matematika",
    perguruan_tinggi: "UNJ",
    jenis_pt: "Negeri",
    tahun_lulus: "2018",
    waktu: "2025-01-10",
    asesor: "Andi",
    makhraj: 90,
    sifat: 85,
    ahkam: 88,
    madA: 80,
    madB: 75,
    gharib: 92,
    total: 510,
  },
  {
    id: 2,
    no_akun: "A002",
    nip: "1987654322",
    nama: "Siti Rahma",
    jk: "P",
    tl: "Bandung",
    pegawai: "Staf TU",
    jenjang: "SMP",
    level: "Junior",
    provinsi: "Jawa Barat",
    kab_kota: "Bandung",
    sekolah: "SMP Negeri 3",
    pendidikan: "D3",
    program_studi: "Administrasi Perkantoran",
    perguruan_tinggi: "Polban",
    jenis_pt: "Negeri",
    tahun_lulus: "2016",
    waktu: "2025-01-15",
    asesor: "Rina",
    makhraj: 80,
    sifat: 82,
    ahkam: 78,
    madA: 70,
    madB: 68,
    gharib: 85,
    total: 463,
  },
  {
    id: 3,
    no_akun: "A003",
    nip: "1987654323",
    nama: "Agus Kurniawan",
    jk: "L",
    tl: "Surabaya",
    pegawai: "Guru",
    jenjang: "SD",
    level: "Middle",
    provinsi: "Jawa Timur",
    kab_kota: "Surabaya",
    sekolah: "SDN 01 Ketintang",
    pendidikan: "S1",
    program_studi: "PGSD",
    perguruan_tinggi: "UNESA",
    jenis_pt: "Negeri",
    tahun_lulus: "2019",
    waktu: "2025-02-03",
    asesor: "Dewi",
    makhraj: 85,
    sifat: 90,
    ahkam: 80,
    madA: 75,
    madB: 70,
    gharib: 95,
    total: 495,
  },
  {
    id: 4,
    no_akun: "A004",
    nip: "1987654324",
    nama: "Nur Aisyah",
    jk: "P",
    tl: "Medan",
    pegawai: "Guru",
    jenjang: "SMA",
    level: "Junior",
    provinsi: "Sumatera Utara",
    kab_kota: "Medan",
    sekolah: "SMA Negeri 5",
    pendidikan: "S2",
    program_studi: "Pendidikan Bahasa Indonesia",
    perguruan_tinggi: "UNIMED",
    jenis_pt: "Negeri",
    tahun_lulus: "2020",
    waktu: "2025-02-07",
    asesor: "Fajar",
    makhraj: 88,
    sifat: 92,
    ahkam: 85,
    madA: 80,
    madB: 78,
    gharib: 90,
    total: 513,
  },
  {
    id: 5,
    no_akun: "A005",
    nip: "1987654325",
    nama: "Rizky Pratama",
    jk: "L",
    tl: "Yogyakarta",
    pegawai: "Staf IT",
    jenjang: "SMP",
    level: "Middle",
    provinsi: "DI Yogyakarta",
    kab_kota: "Yogyakarta",
    sekolah: "SMP Muhammadiyah 4",
    pendidikan: "S1",
    program_studi: "Teknik Informatika",
    perguruan_tinggi: "UGM",
    jenis_pt: "Negeri",
    tahun_lulus: "2021",
    waktu: "2025-03-01",
    asesor: "Talitha",
    makhraj: 82,
    sifat: 87,
    ahkam: 78,
    madA: 74,
    madB: 72,
    gharib: 88,
    total: 481,
  },
];

export const columnsPeserta: Column<DataPerseta>[] = [
  {
    id: "no_akun",
    label: "No. Akun",
    minWidth: 100,
    align: "center",
  },
  {
    id: "nip",
    label: "NIP",
    minWidth: 130,
    align: "center",
  },
  {
    id: "nama",
    label: "Nama Peserta",
    minWidth: 200,
    format: (value) => {
      const nama = String(value);
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
            {nama.charAt(0)}
          </Avatar>
          <Typography variant="body2" fontWeight="medium">
            {nama}
          </Typography>
        </Box>
      );
    },
  },
  {
    id: "jk",
    label: "Jenis Kelamin",
    minWidth: 120,
    align: "center",
    format: (value) => {
      const jk = String(value);
      return (
        <Chip
          label={jk === "L" ? "Laki-laki" : "Perempuan"}
          size="small"
          color={jk === "L" ? "primary" : "secondary"}
        />
      );
    },
  },
  {
    id: "tl",
    label: "Tempat Lahir",
    minWidth: 130,
    align: "center",
  },
  {
    id: "pegawai",
    label: "Jabatan",
    minWidth: 120,
    align: "center",
    format: (value) => {
      return (
        <Chip
          label={String(value)}
          size="small"
          color="info"
          variant="outlined"
        />
      );
    },
  },
  {
    id: "jenjang",
    label: "Jenjang",
    minWidth: 100,
    align: "center",
    format: (value) => {
      return <Chip label={String(value)} size="small" color="primary" />;
    },
  },
  {
    id: "level",
    label: "Level",
    minWidth: 100,
    align: "center",
    format: (value) => {
      const level = String(value);
      let color: "success" | "warning" | "info" = "info";
      if (level === "Senior") color = "success";
      else if (level === "Middle") color = "warning";
      return <Chip label={level} size="small" color={color} />;
    },
  },
  {
    id: "provinsi",
    label: "Provinsi",
    minWidth: 150,
  },
  {
    id: "kab_kota",
    label: "Kab/Kota",
    minWidth: 150,
  },
  {
    id: "sekolah",
    label: "Sekolah",
    minWidth: 200,
  },
  {
    id: "pendidikan",
    label: "Pendidikan",
    minWidth: 100,
    align: "center",
    format: (value) => {
      return (
        <Chip
          label={String(value)}
          size="small"
          color="secondary"
          variant="outlined"
        />
      );
    },
  },
  {
    id: "program_studi",
    label: "Program Studi",
    minWidth: 200,
  },
  {
    id: "perguruan_tinggi",
    label: "Perguruan Tinggi",
    minWidth: 180,
  },
  {
    id: "jenis_pt",
    label: "Jenis PT",
    minWidth: 100,
    align: "center",
  },
  {
    id: "tahun_lulus",
    label: "Tahun Lulus",
    minWidth: 110,
    align: "center",
  },

  {
    id: "asesor",
    label: "Asesor",
    minWidth: 130,
    align: "center",
  },
  {
    id: "waktu",
    label: "waktu",
    minWidth: 130,
    align: "center",
    format: (value) => {
      const date = new Date(String(value));
      return date.toLocaleDateString("id-ID");
    },
  },
  {
    id: "makhraj",
    label: "Skor Makhraj",
    minWidth: 120,
    align: "center",
  },
  { id: "sifat", label: "Skor Sifat", minWidth: 120, align: "center" },
  { id: "ahkam", label: "Skor Ahkam", minWidth: 120, align: "center" },
  { id: "madA", label: "Skor Mad A", minWidth: 120, align: "center" },
  { id: "madB", label: "Skor Mad B", minWidth: 120, align: "center" },
  { id: "gharib", label: "Skor Gharib", minWidth: 120, align: "center" },
  { id: "total", label: "Total Skor", minWidth: 120, align: "center" },
  {
    id: "detail",
    label: "Detail",
    minWidth: 120,
    align: "center",
    format: (_, row: any) => (
      <Chip
        label="Lihat Detail"
        size="small"
        color="primary"
        variant="outlined"
        onClick={() => row.onDetailClick?.(row)}
        sx={{ cursor: "pointer" }}
      />
    ),
  },
];

export default dummyDataPeserta;
