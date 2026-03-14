import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function RiskGauge({ risk, isLoading }) {
  if (isLoading) {
    return (
      <Card className="bg-gradient-to-r from-slate-50 to-blue-50">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </CardContent>
      </Card>
    );
  }

  const getRiskConfig = (riskLevel) => {
    switch (riskLevel) {
      case "high":
        return {
          color: "text-red-600",
          bgColor: "bg-red-100",
          borderColor: "border-red-200", 
          icon: AlertTriangle,
          label: "High Risk",
          description: "Increased chance of symptoms in next 72 hours"
        };
      case "medium":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-100", 
          borderColor: "border-yellow-200",
          icon: Clock,
          label: "Medium Risk",
          description: "Moderate chance of symptoms in next 72 hours"
        };
      default:
        return {
          color: "text-green-600",
          bgColor: "bg-green-100",
          borderColor: "border-green-200", 
          icon: CheckCircle,
          label: "Low Risk",
          description: "Lower chance of symptoms in next 72 hours"
        };
    }
  };

  const config = getRiskConfig(risk?.risk_level || "low");
  const Icon = config.icon;

  return (
    <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal-600" />
          72-Hour Flare-Up Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className={`w-24 h-24 ${config.bgColor} ${config.borderColor} border-4 rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className={`w-10 h-10 ${config.color}`} />
        </div>
        <h3 className={`text-2xl font-bold ${config.color} mb-2`}>
          {config.label}
        </h3>
        <p className="text-slate-600 text-sm mb-4">
          {config.description}
        </p>
        {risk?.confidence_score && (
          <div className="text-xs text-slate-500">
            Confidence: {Math.round(risk.confidence_score * 100)}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}