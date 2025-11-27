import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { AccessTime, Visibility, WhatsApp } from "@mui/icons-material";

interface Props {
  asesmen: any[];
  onOpen: (item: any) => void;
}

const AsesmenListCard: React.FC<Props> = ({ asesmen, onOpen }) => {
  const isDone = (status: string) => status.toLowerCase().includes("selesai");

  const isNotDone = (status: string) => status.toLowerCase().includes("belum");

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        },
      }}
    >
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
          Asesmen
        </Typography>
      </Box>

      <CardContent sx={{ p: 3 }}>
        {asesmen.map((row, i) => (
          <Box
            key={i}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              border: "1px solid #ddd",
              background: "white",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Asesor
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5 }}>
              {row.asesor}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Waktu
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {row.waktu}
            </Typography>

            {/* STATUS SELESAI → BISA DIBUKA */}
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

            {/* STATUS BELUM / BELUM SELESAI → MUNCUL LINK WA GRUP */}
            {isNotDone(row.status) && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  startIcon={<WhatsApp />}
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                  href={row.linkWa}
                  target="_blank"
                >
                  Masuk Grup Asesor
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  disabled
                  sx={{ mt: 1 }}
                >
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
