import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export interface ProvinceChartItem {
  name: string;
  registered: number;
  participated: number;
}

interface ProvinceBarChartProps {
  data: ProvinceChartItem[];
  barColor1?: string;
  barColor2?: string;
  maxWidth?: string | number;
}

export default function ProvinceBarChart({
  data,
  barColor1 = "#8884d8",
  barColor2 = "#82ca9d",
  maxWidth = "900px",
}: ProvinceBarChartProps) {
  return (
    <BarChart
      data={data}
      responsive
      style={{
        width: "100%",
        maxWidth: maxWidth,
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      margin={{ top: 25, right: 10, left: 10, bottom: 50 }}
    >
      <CartesianGrid strokeDasharray="3 3" />

      {/* LABEL X MIRING */}
      <XAxis
        dataKey="name"
        interval={0}
        tick={{ fontSize: 11 }}
        angle={-45}
        textAnchor="end"
        height={70}
      />

      <YAxis tick={{ fontSize: 12 }} />
      <Tooltip />
      <Legend />

      <Bar
        dataKey="registered"
        name="Terdaftar"
        fill={barColor1}
        background={{ fill: "#eee" }}
      />

      <Bar dataKey="participated" name="Berpartisipasi" fill={barColor2} />
    </BarChart>
  );
}
