import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

interface ParticipationCardProps {
  title: string; // contoh: PAUD/TK
  total: number; // contoh: 8.069
  done: number; // contoh: 3.467
  color: string; // background color
}

export default function StatParticipationCard({
  title,
  total,
  done,
  color,
}: ParticipationCardProps) {
  const notYet = total - done;
  const percent = total > 0 ? ((done / total) * 100).toFixed(2) : "0";

  return (
    <Card
      sx={{
        backgroundColor: color,
        color: "white",
        borderRadius: 2,
        boxShadow: 3,
        minHeight: 140,
        width: 140,
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* Angka utama */}
        <Typography variant="h5" fontWeight="bold">
          {done.toLocaleString()}
        </Typography>

        {/* Judul */}
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {title}
        </Typography>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.4)", my: 1 }} />

        {/* Detail: DARI, BELUM, PERSEN */}
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
          <Typography variant="caption">{percent} %</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
