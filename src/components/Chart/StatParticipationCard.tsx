import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

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
  const percent = total > 0 ? ((done / total) * 100).toFixed(2) : "0";

  return (
    <Card
      sx={{
        backgroundColor: color,
        color: "white",
        borderRadius: 2,
        boxShadow: 3,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {/* Angka utama */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.7rem" }, // responsif
          }}
        >
          {done.toLocaleString()}
        </Typography>

        {/* Judul */}
        <Typography
          variant="body2"
          sx={{ opacity: 0.9, fontSize: { xs: "0.7rem", sm: "0.85rem" } }}
        >
          {title}
        </Typography>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.4)", my: 1 }} />

        {/* Detail: DARI, BELUM, PERSEN */}
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="caption"
            sx={{ fontSize: { xs: "0.6rem", sm: "0.75rem" } }}
          >
            DARI
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: { xs: "0.6rem", sm: "0.75rem" } }}
          >
            {total.toLocaleString()}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="caption"
            sx={{ fontSize: { xs: "0.6rem", sm: "0.75rem" } }}
          >
            BELUM
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: { xs: "0.6rem", sm: "0.75rem" } }}
          >
            {notYet.toLocaleString()}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="caption"
            sx={{ fontSize: { xs: "0.6rem", sm: "0.75rem" } }}
          >
            PERSEN
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: { xs: "0.6rem", sm: "0.75rem" } }}
          >
            {percent} %
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
