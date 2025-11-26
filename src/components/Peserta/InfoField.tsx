import { Box, Typography } from "@mui/material";

interface Props {
  label: string;
  value: string;
}

const InfoField: React.FC<Props> = ({ label, value }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary" fontWeight={600}>
        {label}
      </Typography>

      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{
          p: 1,
          mt: 0.5,
          borderRadius: 2,
          background: "#f8f9fa",
          border: "1px solid #e0e0e0",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default InfoField;
