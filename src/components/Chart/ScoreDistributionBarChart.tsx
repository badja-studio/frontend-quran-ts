import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography, Box, Grid } from "@mui/material";

export interface ScoreBarChartItem {
  label: string;
  score_0_59: number;
  score_60_89: number;
  score_90_100: number;
  total: number;
}

interface ScoreDistributionBarChartProps {
  title: string;
  data: ScoreBarChartItem[];
  height?: number;
}

const ScoreDistributionBarChart: React.FC<ScoreDistributionBarChartProps> = ({
  title,
  data,
  height = 400,
}) => {
  // Transform data untuk chart
  const chartData = data.map((item) => ({
    name: item.label,
    Pratama: item.score_0_59,
    Madya: item.score_60_89,
    Mahir: item.score_90_100,
  }));

  return (
    <Grid sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
      >
        {title}
      </Typography>
      <Box sx={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 100,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={120}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{
                value: "Jumlah Peserta",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              formatter={(value: number) => value.toLocaleString("id-ID")}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 10 }} />
            <Bar
              dataKey="Pratama"
              stackId="a"
              fill="#D32F2F"
              name="Pratama (0-59)"
            />
            <Bar
              dataKey="Madya"
              stackId="a"
              fill="#FFA726"
              name="Madya (60-89)"
            />
            <Bar
              dataKey="Mahir"
              stackId="a"
              fill="#66BB6A"
              name="Mahir (90-100)"
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Grid>
  );
};

export default ScoreDistributionBarChart;
