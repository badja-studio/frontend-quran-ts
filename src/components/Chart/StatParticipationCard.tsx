import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  LinearProgress,
} from "@mui/material";

interface ParticipationCardProps {
  title: string;
  total: number;
  done: number;
  color: string;
}

export default function StatParticipationCard({
  title,
  total,
  done,
  color,
}: ParticipationCardProps) {
  const notYet = total - done;
  const percent = total > 0 ? (done / total) * 100 : 0;

  return (
    <Card
      sx={{
        backgroundColor: color,
        color: "white",
        borderRadius: 3,
        boxShadow: 5,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: { xs: 2, sm: 3 },
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
        },
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {/* Angka utama */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.3rem" },
            lineHeight: 1,
          }}
        >
          {done.toLocaleString()}
        </Typography>

        {/* Judul */}
        <Typography
          variant="subtitle2"
          sx={{ opacity: 0.85, fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
        >
          {title}
        </Typography>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.4)", my: 1.5 }} />

        {/* Progress Bar */}
        <Box sx={{ width: "100%", mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={percent}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: "rgba(255,255,255,0.2)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
                backgroundColor: "rgba(255,255,255,0.9)",
              },
            }}
          />
        </Box>

        {/* Detail Angka */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption">DARI</Typography>
          <Typography variant="caption">{total.toLocaleString()}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption">BELUM</Typography>
          <Typography variant="caption">{notYet.toLocaleString()}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption">PERSEN</Typography>
          <Typography variant="caption">{percent.toFixed(2)} %</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
