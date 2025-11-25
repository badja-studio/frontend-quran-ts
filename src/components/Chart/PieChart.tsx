import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";

export interface PieDataItem {
  name: string;
  value: number;
  [key: string]: any;
}

interface ReusablePieChartProps {
  data: PieDataItem[];
  colors?: string[];
  isAnimationActive?: boolean;
  size?: number | string;
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (!cx || !cy || !innerRadius || !outerRadius) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const ReusablePieChart: React.FC<ReusablePieChartProps> = ({
  data,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
  isAnimationActive = true,
  size = "500px",
}) => {
  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: size,
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        dataKey="value"
        isAnimationActive={isAnimationActive}
      >
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default ReusablePieChart;
