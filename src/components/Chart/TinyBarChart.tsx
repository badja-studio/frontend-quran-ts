import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
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
  height = 250,
}) => {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 80 }}
        >
          <XAxis
            dataKey="name"
            angle={-55}
            textAnchor="end"
            interval={0}
            height={80}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />

          <Bar dataKey="total">
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
