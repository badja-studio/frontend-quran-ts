import { ReactNode } from "react";

interface StatCardProps {
  value: string | number;
  label: string;
  color?: string; // warna utama kartu
  icon?: ReactNode; // icon watermark
}

export default function StatCard({
  value,
  label,
  color = "#3b82f6",
  icon,
}: StatCardProps) {
  return (
    <div
      className="relative rounded-lg p-5 text-white shadow-md flex flex-col justify-center"
      style={{ backgroundColor: color, minHeight: "110px" }}
    >
      {/* Watermark Icon */}
      <div className="absolute right-2 bottom-2 opacity-20 scale-150">
        {icon}
      </div>

      <div className="text-3xl font-bold leading-none">{value}</div>
      <div className="text-sm mt-1">{label}</div>
    </div>
  );
}
