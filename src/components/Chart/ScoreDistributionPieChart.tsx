import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Typography, Box, Grid } from "@mui/material";

export interface ScorePieChartData {
  label: string;
  score_0_59: number;
  score_60_89: number;
  score_90_100: number;
  total: number;
}

interface ScoreDistributionPieChartProps {
  title: string;
  data: ScorePieChartData[];
  size?: number;
}

interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

const COLORS = {
  Pratama: "#D32F2F",
  Madya: "#FFA726",
  Mahir: "#66BB6A",
};

const ScoreDistributionPieChart: React.FC<ScoreDistributionPieChartProps> = ({
  title,
  data,
  size = 300,
}) => {
  // Hitung total untuk setiap kategori nilai dari semua data
  const aggregatedData = useMemo(() => {
    const totals = data.reduce(
      (acc, item) => ({
        total_0_59: acc.total_0_59 + item.score_0_59,
        total_60_89: acc.total_60_89 + item.score_60_89,
        total_90_100: acc.total_90_100 + item.score_90_100,
      }),
      { total_0_59: 0, total_60_89: 0, total_90_100: 0 }
    );

    const grandTotal =
      totals.total_0_59 + totals.total_60_89 + totals.total_90_100;

    return [
      {
        name: "Pratama (0-59)",
        value: totals.total_0_59,
        percentage: ((totals.total_0_59 / grandTotal) * 100).toFixed(2),
      },
      {
        name: "Madya (60-89)",
        value: totals.total_60_89,
        percentage: ((totals.total_60_89 / grandTotal) * 100).toFixed(2),
      },
      {
        name: "Mahir (90-100)",
        value: totals.total_90_100,
        percentage: ((totals.total_90_100 / grandTotal) * 100).toFixed(2),
      },
    ];
  }, [data]);

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelProps) => {
    // Guard clause untuk memastikan semua nilai ada
    if (
      !cx ||
      !cy ||
      midAngle === undefined ||
      !innerRadius ||
      !outerRadius ||
      !percent
    ) {
      return null;
    }

    // Hanya tampilkan label jika persentasenya >= 5%
    if (percent < 0.05) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={16}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <Grid sx={{ p: 3, height: "100%" }}>
      <Typography
        variant="h6"
        sx={{ mb: 3, fontWeight: "bold", textAlign: "center", fontSize: 18 }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={aggregatedData}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={110}
              innerRadius={0}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
            >
              {aggregatedData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    Object.values(COLORS)[index % Object.values(COLORS).length]
                  }
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => {
                const item = aggregatedData.find((d) => d.value === value);
                return item
                  ? `${value.toLocaleString("id-ID")} peserta (${
                      item.percentage
                    }%)`
                  : `${value.toLocaleString("id-ID")} peserta`;
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={50}
              iconType="circle"
              wrapperStyle={{ fontSize: "14px", paddingTop: "10px" }}
              formatter={(value) => {
                const item = aggregatedData.find((d) => d.name === value);
                return item
                  ? `${value}: ${item.value.toLocaleString("id-ID")} (${
                      item.percentage
                    }%)`
                  : value;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Grid>
  );
};

export default ScoreDistributionPieChart;
