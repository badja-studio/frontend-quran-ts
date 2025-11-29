import { DataAsesor } from "./type";
import { Column } from "../../../components/Table/DataTable";
import { Box, Typography, Chip, Avatar } from "@mui/material";

export const columnsAsesor: Column<DataAsesor>[] = [
  {
    id: "name",
    label: "Nama Asesor",
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
    id: "no_telepon",
    label: "No. Telepon",
    minWidth: 150,
    align: "center",
    format: (value) => `+${String(value)}`,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 200,
  },
  {
    id: "link_grup_wa",
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
    id: "total_peserta_belum_asesmen",
    label: "Total Beserta Belum Asesmen",
    minWidth: 80,
    align: "center",
  },
  {
    id: "total_peserta_selesai_asesmen",
    label: "Total Peserta Selesai Asesmen",
    minWidth: 80,
    align: "center",
  },
];
