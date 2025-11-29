import React from "react";
import { Card, Box, Paper, Typography } from "@mui/material";

interface Props {
  peserta: {
    akun: string;
    nama: string;
    level: string;
    jenjang: string;
    status: string;
    sekolah: string;
  };
  totalAverage: string;
}

const HeaderPeserta: React.FC<Props> = ({ peserta, totalAverage }) => {
  return (
    <Card
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.300",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        gap: 1.5,
      }}
    >
      <Box>
        <Typography fontWeight={700} fontSize="clamp(1.2rem, 2vw, 1.4rem)">
          {peserta.nama}
        </Typography>

        <Typography
          fontSize="clamp(0.8rem, 1.4vw, 1rem)"
          color="text.secondary"
        >
          {peserta.level} • {peserta.jenjang} • {peserta.status}
        </Typography>

        <Typography
          fontSize="clamp(0.8rem, 1.4vw, 1rem)"
          color="text.secondary"
        >
          {peserta.sekolah}
        </Typography>
      </Box>

      <Paper
        sx={{
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: "grey.100",
          border: "1px solid",
          borderColor: "grey.300",
          textAlign: "center",
        }}
      >
        <Typography
          fontSize="clamp(0.8rem, 1.2vw, 1rem)"
          color="text.secondary"
        >
          Rata-rata
        </Typography>
        <Typography fontWeight={700} fontSize="clamp(1rem, 1.8vw, 1.3rem)">
          {totalAverage}
        </Typography>
      </Paper>
    </Card>
  );
};

export default HeaderPeserta;
