import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import React from "react"; // Penting: Impor React jika belum diimpor

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
  maxWidth = "900px",
}) => {
  return (
    <div style={{ maxWidth: maxWidth, margin: "0 auto" }}>
      {/* Tambahkan Judul di sini */}
      {title && (
        <h3
          style={{ textAlign: "center", marginBottom: "15px", color: "#333" }}
        >
          {title}
        </h3>
      )}

      <BarChart
        style={{
          width: "100%",
          aspectRatio: 1.8,
        }}
        data={data}
        margin={{ top: 25, right: 20, left: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        {keys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            name={key.replace(/_/g, " ").toUpperCase()}
            fill={colors[index % colors.length]}
          />
        ))}
      </BarChart>
    </div>
  );
};

export default DynamicBarChart;
