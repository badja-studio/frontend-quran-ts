import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { AccessTime, Visibility } from "@mui/icons-material";

interface Props {
  asesmen: any[];
  onOpen: (item: any) => void;
}

const AsesmenListCard: React.FC<Props> = ({ asesmen, onOpen }) => {
  const isDone = (status: string) => status.toLowerCase().includes("selesai");

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

            {isDone(row.status) ? (
              <Button
                variant="contained"
                startIcon={<Visibility />}
                fullWidth
                sx={{ textTransform: "none", fontWeight: "bold" }}
                onClick={() => onOpen(row)}
              >
                Lihat Hasil
              </Button>
            ) : (
              <Button variant="outlined" color="error" fullWidth disabled>
                Belum Asesmen
              </Button>
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default AsesmenListCard;
