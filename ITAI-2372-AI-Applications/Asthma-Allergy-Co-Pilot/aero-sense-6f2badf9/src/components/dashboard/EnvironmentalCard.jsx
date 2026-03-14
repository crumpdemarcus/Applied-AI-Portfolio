import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Wind, Sun, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function EnvironmentalCard({ 
  type, 
  title, 
  value, 
  trend, 
  color, 
  bgColor 
}) {
  const getIcon = () => {
    switch (type) {
      case "pollen":
        return Sun;
      case "air_quality":
        return Wind;
      case "weather":
        return CloudRain;
      default:
        return Sun;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "improving":
        return TrendingDown;
      case "worsening":
        return TrendingUp;
      default:
        return Minus;
    }
  };

  const Icon = getIcon();
  const TrendIcon = getTrendIcon();

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div className="flex items-center gap-1">
            <TrendIcon className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 capitalize">{trend}</span>
          </div>
        </div>
        <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </CardContent>
    </Card>
  );
}