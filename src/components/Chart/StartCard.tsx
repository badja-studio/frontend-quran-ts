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
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        overflow: "hidden",
        background: `linear-gradient(135deg, ${color}, ${color}bb)`,
        color: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
        },
      }}
    >
      {/* Watermark Icon */}
      {icon && (
        <Box
          sx={{
            position: "absolute",
            right: 12,
            bottom: 12,
            opacity: 0.12,
            transform: "scale(2) rotate(-15deg)",
            pointerEvents: "none",
          }}
        >
          {icon}
        </Box>
      )}

      {/* Value */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          zIndex: 10,
          fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
        }}
      >
        {value}
      </Typography>

      {/* Label */}
      <Typography
        variant="body2"
        sx={{
          mt: 0.5,
          opacity: 0.85,
          zIndex: 10,
          fontSize: { xs: 12, sm: 13, md: 14 },
        }}
      >
        {label}
      </Typography>
    </Card>
  );
}
