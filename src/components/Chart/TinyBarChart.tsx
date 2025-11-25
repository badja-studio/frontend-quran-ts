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
        <BarChart data={data}>
          <XAxis dataKey="name" />
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
