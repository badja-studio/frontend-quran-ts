import React from "react";
import { Card, Box, Paper, Typography, Chip } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

interface Props {
  peserta: {
    akun: string;
    nama: string;
    level: string;

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
        p: 3,
        borderRadius: 3,
        bgcolor: "white",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        border: "1px solid",
        borderColor: "grey.200",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "center" },
        gap: 3,
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          fontWeight={600}
          fontSize="clamp(1.25rem, 2vw, 1.5rem)"
          sx={{
            color: "grey.900",
            mb: 1.5,
            letterSpacing: "-0.01em",
          }}
        >
          {peserta.nama}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Chip
            label={peserta.level}
            size="small"
            sx={{
              bgcolor: "grey.100",
              color: "grey.800",
              fontWeight: 500,
              fontSize: "0.813rem",
              height: 28,
              borderRadius: 1.5,
              "&:hover": {
                bgcolor: "grey.200",
              },
            }}
          />

          <Chip
            label={peserta.status}
            size="small"
            sx={{
              bgcolor:
                peserta.status.toLowerCase() === "aktif"
                  ? "success.50"
                  : "grey.100",
              color:
                peserta.status.toLowerCase() === "aktif"
                  ? "success.700"
                  : "grey.800",
              fontWeight: 500,
              fontSize: "0.813rem",
              height: 28,
              borderRadius: 1.5,
              border:
                peserta.status.toLowerCase() === "aktif" ? "1px solid" : "none",
              borderColor:
                peserta.status.toLowerCase() === "aktif"
                  ? "success.200"
                  : "transparent",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SchoolIcon sx={{ fontSize: 18, color: "grey.500" }} />
          <Typography
            fontSize="clamp(0.875rem, 1.4vw, 0.938rem)"
            sx={{
              color: "grey.600",
              fontWeight: 400,
            }}
          >
            {peserta.sekolah}
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          px: 3.5,
          py: 2.5,
          borderRadius: 2.5,
          bgcolor: "grey.50",
          border: "1.5px solid",
          borderColor: "grey.200",
          textAlign: "center",
          minWidth: { xs: "100%", md: 140 },
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: "grey.100",
            borderColor: "grey.300",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Typography
          fontSize="clamp(0.75rem, 1.2vw, 0.813rem)"
          sx={{
            color: "grey.600",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            mb: 0.5,
          }}
        >
          Rata-rata
        </Typography>
        <Typography
          fontWeight={700}
          fontSize="clamp(1.5rem, 2vw, 1.875rem)"
          sx={{
            color: "grey.900",
            letterSpacing: "-0.02em",
          }}
        >
          {totalAverage}
        </Typography>
      </Paper>
    </Card>
  );
};

export default HeaderPeserta;
