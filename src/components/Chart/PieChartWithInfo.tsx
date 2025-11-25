import React from "react";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import ReusablePieChart, { PieDataItem } from "./PieChart";

interface PieChartWithInfoProps {
  title?: string;
  data: PieDataItem[];
  colors?: string[];
  size?: number | string;
}

const PieChartWithInfo: React.FC<PieChartWithInfoProps> = ({
  data,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
  size = "500px",
}) => {
  const totalAll = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card>
      <CardContent>
        {/* Chart */}
        <ReusablePieChart data={data} colors={colors} size={size} />

        {/* Info & Legend */}
        <Box mt={3}>
          <Typography fontWeight={600} mb={1}>
            Total: {totalAll.toLocaleString()}
          </Typography>

          <Stack spacing={1}>
            {data.map((item, index) => (
              <Box
                key={item.name}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    bgcolor: colors[index % colors.length],
                    borderRadius: 1,
                    mr: 1,
                  }}
                />
                <Typography>
                  {item.name}: {item.value.toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChartWithInfo;
