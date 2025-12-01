import { DataPersetaSiapAssesmen } from "./type";
import { Column } from "../../../components/Table/DataTable";
import { Box, Typography, Chip, Avatar } from "@mui/material";

export const columnsPeserta: Column<DataPersetaSiapAssesmen>[] = [
  {
    id: "nik",
    label: "NIK",
    minWidth: 150,
    align: "center",
  },
  {
    id: "username",
    label: "Username",
    minWidth: 150,
    align: "center",
  },
  {
    id: "nama",
    label: "Nama Peserta",
    minWidth: 220,
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
    id: "email",
    label: "Email",
    minWidth: 180,
  },
  {
    id: "nomor_telepon",
    label: "WhatsApp",
    minWidth: 150,
  },
  {
    id: "jenis_kelamin",
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
    id: "tempat_lahir",
    label: "Tempat Lahir",
    minWidth: 130,
  },
  {
    id: "tanggal_lahir",
    label: "Tanggal Lahir",
    minWidth: 130,
    align: "center",
    format: (value) => new Date(String(value)).toLocaleDateString("id-ID"),
  },
  {
    id: "pendidikan",
    label: "Pendidikan Terakhir",
    minWidth: 150,
    align: "center",
  },
  {
    id: "perguruan_tinggi",
    label: "Asal Kampus",
    minWidth: 180,
  },
  {
    id: "fakultas",
    label: "Fakultas",
    minWidth: 150,
  },
  {
    id: "prodi",
    label: "Program Studi",
    minWidth: 180,
  },
  {
    id: "tahun_lulus",
    label: "Tahun Lulus",
    minWidth: 120,
    align: "center",
  },
  {
    id: "jenjang",
    label: "Jenjang",
    minWidth: 120,
    align: "center",
    format: (value) => (
      <Chip size="small" label={String(value)} color="primary" />
    ),
  },
  {
    id: "sekolah",
    label: "Nama Sekolah",
    minWidth: 180,
  },
  {
    id: "alamat_sekolah",
    label: "Alamat Sekolah",
    minWidth: 220,
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
    id: "kecamatan",
    label: "Kecamatan",
    minWidth: 150,
  },
  {
    id: "desa_kelurahan",
    label: "Desa/Kelurahan",
    minWidth: 150,
  },
  {
    id: "pegawai",
    label: "Status Pegawai",
    minWidth: 150,
    align: "center",
    format: (value) => (
      <Chip
        label={String(value)}
        size="small"
        color="info"
        variant="outlined"
      />
    ),
  },
  {
    id: "sertifikasi",
    label: "Sertifikasi",
    minWidth: 120,
    align: "center",
    format: (value) => {
      const s = String(value);
      return (
        <Chip
          label={s === "Sudah" ? "Sudah" : "Belum"}
          size="small"
          color={s === "Sudah" ? "success" : "warning"}
        />
      );
    },
  },
  {
    id: "tahun_sertifikasi",
    label: "Tahun Sertifikasi",
    minWidth: 120,
    align: "center",
  },
  {
    id: "mapel",
    label: "Mapel Diampu",
    minWidth: 180,
  },
  {
    id: "jadwal",
    label: "Jadwal",
    minWidth: 150,
    align: "center",
    format: (value) => new Date(String(value)).toLocaleDateString("id-ID"),
  },

  {
    id: "asesor",
    label: "Asesor",
    minWidth: 130,
    align: "center",
  },
];
