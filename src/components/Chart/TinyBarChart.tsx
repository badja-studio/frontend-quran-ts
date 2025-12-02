import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface KesalahanItem {
  name: string;
  total: number;
}

interface KesalahanBarProps {
  data: KesalahanItem[];
  colors?: string[];
  height?: number;
}

const ReusableKesalahanBarChart: React.FC<KesalahanBarProps> = ({
  data,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"],
  height = 300,
}) => {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 80 }}
        >
          {/* Grid halus */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

          {/* X Axis miring */}
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={70}
            tick={{ fontSize: 12, fill: "#555" }}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            tickFormatter={(val) => val.toLocaleString()}
          />

          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            formatter={(value: number) => value.toLocaleString()}
          />

          <Bar
            dataKey="total"
            radius={[6, 6, 0, 0]}
            barSize={30}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReusableKesalahanBarChart;
