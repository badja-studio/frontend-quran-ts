import React from "react";
import { Box, Typography, Stack } from "@mui/material";
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
  size = "500px",
}) => {
  const totalAll = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "40%",
        mx: "auto",
      }}
    >
      <ReusablePieChart data={data} colors={colors} size={size} />

      <Box mt={2} sx={{ width: "100%", maxWidth: 220 }}>
        <Typography
          fontWeight={600}
          mb={1}
          sx={{
            fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
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
                sx={{
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: colors[index % colors.length],
                    borderRadius: "3px",
                    mr: 1,
                  }}
                />

                <Typography
                  fontSize={10}
                  textAlign="left"
                  sx={{ fontSize: "clamp(0.9rem, 2vw, 1.2rem)" }}
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
