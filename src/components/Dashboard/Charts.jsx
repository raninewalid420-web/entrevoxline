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

export const Charts = ({ data, title, dataKey, barKey, colorType = "accentBlue" }) => {
  // colorType peut être "accentBlue", "accentRed", "success", etc.
  const barColors = {
    primary: "#FFFFFF",
    secondary: "#0B1F3A",
    accentBlue: "#0B1F3A",
    accentRed: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
  };

  return (
    <div className="w-full h-80 bg-primary rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-bold mb-2 text-secondary">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey={dataKey} stroke="#0B1F3A" />
          <YAxis stroke="#0B1F3A" />
          <Tooltip
            contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E7EB" }}
          />
          <Legend />
          <Bar dataKey={barKey} fill={barColors[colorType]} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
