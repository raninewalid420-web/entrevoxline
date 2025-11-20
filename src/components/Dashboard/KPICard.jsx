import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const KPICard = ({ title, value, description, colorType = "accentBlue" }) => {
  // Palette personnalisée
  const colors = {
    primary: "bg-white text-0B1F3A",
    secondary: "bg-0B1F3A text-white",
    accentBlue: "bg-white text-[#0B1F3A]",
    accentRed: "bg-EF4444 text-white",
    success: "bg-10B981 text-white",
    warning: "bg-F59E0B text-white",
  };

  return (
    <Card className={`w-60 ${colors[colorType]} shadow-md rounded-lg`}>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};
