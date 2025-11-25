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
import React from "react";

export interface DynamicBarItem {
  name: string;
  [key: string]: any;
}

interface DynamicBarChartProps {
  title?: string;
  data: DynamicBarItem[];
  keys: string[];
  colors?: string[];
  maxWidth?: number | string;
}

const DynamicBarChart: React.FC<DynamicBarChartProps> = ({
  title = "",
  data,
  keys,
  colors = ["#E64A19", "#2E7D32", "#1565C0", "#4A148C", "#795548"],
  maxWidth = "100%",
}) => {
  return (
    <div style={{ maxWidth: maxWidth, margin: "0 auto", width: "100%" }}>
      {title && (
        <h3
          style={{
            textAlign: "center",
            marginBottom: "15px",
            color: "#333",
            fontSize: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          {title}
        </h3>
      )}

      <ResponsiveContainer width="100%" aspect={1.8}>
        <BarChart
          data={data}
          margin={{ top: 50, right: 20, left: 5, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            interval={0} // menampilkan semua label, tapi bisa diubah di mobile
          />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              name={key.replace(/_/g, " ").toUpperCase()}
              fill={colors[index % colors.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicBarChart;
