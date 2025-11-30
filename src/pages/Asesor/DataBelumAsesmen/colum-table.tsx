import { DataPersetaBelum } from "./type";
import { Column } from "../../../components/Table/DataTable";
import { Box, Typography, Chip, Avatar } from "@mui/material";

export const columnsPeserta: Column<DataPersetaBelum>[] = [
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
    align: "center",
  },
  {
    id: "pegawai",
    label: "Pegawai",
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
    id: "prodi",
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
    id: "jadwal",
    label: "Jadwal",
    minWidth: 130,
    align: "center",
    format: (value) => {
      const date = new Date(String(value));
      return date.toLocaleDateString("id-ID");
    },
  },
  {
    id: "asesor",
    label: "Asesor",
    minWidth: 130,
    align: "center",
  },
];
