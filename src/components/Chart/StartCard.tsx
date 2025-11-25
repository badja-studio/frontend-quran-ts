import { Card, Box, Typography } from "@mui/material";

interface StatCardProps {
  value: string | number;
  label: string;
  color?: string;
  icon?: React.ReactNode;
}

export default function StatCard({
  value,
  label,
  color = "#0D47A1",
  icon,
}: StatCardProps) {
  return (
    <Card
      sx={{
        position: "relative",
        p: 2.5,
        borderRadius: 3,
        overflow: "hidden",

        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        color: "white",

        width: 140,
        height: 120,

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Watermark Icon */}
      <Box
        sx={{
          position: "absolute",
          right: 10,
          bottom: 10,
          opacity: 0.15,
          transform: "scale(1.7)",
          pointerEvents: "none",
        }}
      >
        {icon}
      </Box>

      <Typography variant="h5" fontWeight="bold" sx={{ zIndex: 10 }}>
        {value}
      </Typography>

      <Typography
        variant="body2"
        sx={{ mt: 0.5, opacity: 0.9, zIndex: 10, fontSize: 13 }}
      >
        {label}
      </Typography>
    </Card>
  );
}
