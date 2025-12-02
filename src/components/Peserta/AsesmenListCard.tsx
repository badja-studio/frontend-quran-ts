import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { AccessTime, Visibility, WhatsApp } from "@mui/icons-material";
import { DataPeserta } from "../../pages/Peserta/type";

interface Props {
  asesmen: DataPeserta[];
  onOpen: (item: DataPeserta) => void;
}

const AsesmenListCard: React.FC<Props> = ({ asesmen, onOpen }) => {
  // Status helpers
  const isDone = (status?: string) => (status || "").toLowerCase() === "sudah";
  const isNotDone = (status?: string) =>
    (status || "").toLowerCase() === "belum";

  // Format WA nomor menjadi +62
  const formatWA = (number?: string) => {
    if (!number) return "#";
    let no = number.replace(/\D/g, ""); // hapus karakter non-digit
    if (no.startsWith("0")) {
      no = "62" + no.slice(1); // ganti 0 awal dengan 62
    }
    return `https://wa.me/${no}`;
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <AccessTime />
        <Typography variant="h6" fontWeight="bold">
          Daftar Asesmen
        </Typography>
      </Box>

      <CardContent sx={{ p: 2 }}>
        {asesmen.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mt={2}
          >
            Tidak ada data asesmen
          </Typography>
        )}

        {asesmen.map((row, i) => (
          <Box
            key={i}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              bgcolor: "background.paper",
              transition: "0.2s",
              "&:hover": {
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              },
            }}
          >
            {/* Status & Nama Asesor */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Asesor
              </Typography>
              <Chip
                label={row.status || "Belum"}
                size="small"
                color={isDone(row.status) ? "success" : "warning"}
              />
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
              {row.asesor?.name || "-"}
            </Typography>

            <Divider sx={{ mb: 1 }} />

            {/* Waktu Pelaksanaan */}
            <Typography variant="body2" color="text.secondary">
              Waktu Pelaksanaan
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {row.jadwal || "-"}
            </Typography>

            {/* Nomor WA Asesor */}
            <Typography variant="body2" color="text.secondary">
              Nomor WA Asesor
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {row.asesor?.no_telepon || "-"}
            </Typography>

            {/* Tombol berdasarkan status */}
            {isDone(row.status) && (
              <Button
                variant="contained"
                startIcon={<Visibility />}
                fullWidth
                sx={{ textTransform: "none", fontWeight: "bold" }}
                onClick={() => onOpen(row)}
              >
                Lihat Hasil
              </Button>
            )}

            {isNotDone(row.status) && (
              <Box
                sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<WhatsApp />}
                  fullWidth
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                  onClick={() => {
                    const waLink = formatWA(row.asesor?.no_telepon);
                    window.open(waLink, "_blank");
                  }}
                >
                  Hubungi Asesor
                </Button>
                <Button variant="outlined" color="error" fullWidth disabled>
                  Belum Asesmen
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default AsesmenListCard;
