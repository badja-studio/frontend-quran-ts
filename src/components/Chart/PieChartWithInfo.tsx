import React from "react";
import { Box, Typography, Stack, useMediaQuery, useTheme } from "@mui/material";
import ReusablePieChart, { PieDataItem } from "./PieChart";

interface PieChartWithInfoProps {
  title?: string;
  data: PieDataItem[];
  colors?: string[];
  size?: number | string;
}

const PieChartWithInfo: React.FC<PieChartWithInfoProps> = ({
  data,
  colors = ["#0D47A1", "#2E7D32", "#FF6F00", "#795548"],
}) => {
  const totalAll = data.reduce((acc, item) => acc + item.value, 0);

  const theme = useTheme();

  // Responsive detection
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));

  // Final responsive size
  const finalSize = isXs ? 180 : isSm ? 220 : isMd ? 260 : 300;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

        width: {
          xs: "100%",
          sm: "100%",
          md: "80%",
          lg: "70%",
        },
        mx: "auto",
      }}
    >
      <ReusablePieChart data={data} colors={colors} size={finalSize} />

      <Box mt={2} sx={{ width: "100%", maxWidth: { xs: 220, md: 260 } }}>
        <Typography
          fontWeight={600}
          mb={1}
          sx={{
            fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
          }}
        >
          Total: {totalAll.toLocaleString()}
        </Typography>

        <Stack spacing={1}>
          {data.map((item, index) => {
            const percent = ((item.value / totalAll) * 100).toFixed(2);

            return (
              <Box
                key={item.name}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: colors[index % colors.length],
                    borderRadius: "3px",
                    mr: 1,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)",
                  }}
                >
                  {item.name}: {item.value.toLocaleString()} ({percent}%)
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default PieChartWithInfo;
