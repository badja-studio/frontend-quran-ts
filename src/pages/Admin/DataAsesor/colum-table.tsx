import { DataAsesor } from "./type";
import { Column } from "../../../components/Table/DataTable";
import { Box, Typography, Chip, Avatar } from "@mui/material";

export const dummyDataAsesor: DataAsesor[] = [
  {
    id: 1,
    nama: "Budi Santoso",
    username: "budi123",
    no_telp: 628123456789,
    email: "budi@example.com",
    link_wa: "https://wa.me/628123456789",
    belum: "3",
    sudah: "5",
  },
  {
    id: 2,
    nama: "Siti Rahma",
    username: "siti_r",
    no_telp: 628987654321,
    email: "siti@example.com",
    link_wa: "https://wa.me/628987654321",
    belum: "1",
    sudah: "4",
  },
  {
    id: 3,
    nama: "Agus Kurnia",
    username: "agus_k",
    no_telp: 628555666777,
    email: "agus@example.com",
    link_wa: "https://wa.me/628555666777",
    belum: "0",
    sudah: "7",
  },
];

export const columnsAsesor: Column<DataAsesor>[] = [
  {
    id: "nama",
    label: "Nama Peserta",
    minWidth: 180,
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
    id: "username",
    label: "Username",
    minWidth: 120,
    align: "center",
  },
  {
    id: "no_telp",
    label: "No. Telepon",
    minWidth: 150,
    align: "center",
    format: (value) => `+${value}`,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 200,
  },
  {
    id: "link_wa",
    label: "WA",
    minWidth: 150,
    align: "center",
    format: (value) => (
      <Chip
        label="Link Grup WhatsApp"
        color="success"
        size="small"
        component="a"
        href={String(value)}
        target="_blank"
        clickable
      />
    ),
  },
  {
    id: "belum",
    label: "Belum",
    minWidth: 80,
    align: "center",
  },
  {
    id: "sudah",
    label: "Sudah",
    minWidth: 80,
    align: "center",
  },
];
