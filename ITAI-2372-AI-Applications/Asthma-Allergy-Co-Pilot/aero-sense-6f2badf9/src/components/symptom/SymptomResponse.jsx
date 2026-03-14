import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Activity, 
  Tag,
  Thermometer,
  Droplets,
  Wind
} from "lucide-react";

export default function SymptomResponse({ analysis }) {
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case "severe":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: AlertTriangle,
          iconColor: "text-red-600"
        };
      case "moderate": 
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: Clock,
          iconColor: "text-yellow-600"
        };
      default:
        return {
          color: "bg-green-100 text-green-800 border-green-200", 
          icon: CheckCircle,
          iconColor: "text-green-600"
        };
    }
  };

  const getTriageConfig = (triage) => {
    switch (triage) {
      case "urgent":
        return {
          color: "bg-red-100 text-red-800",
          label: "Seek Urgent Care",
          description: "Consider immediate medical attention"
        };
      case "primary_care":
        return {
          color: "bg-yellow-100 text-yellow-800",
          label: "Contact Primary Care",
          description: "Schedule appointment with your doctor"
        };
      default:
        return {
          color: "bg-green-100 text-green-800", 
          label: "Self-Care Appropriate",
          description: "Monitor symptoms and follow care plan"
        };
    }
  };

  const severityConfig = getSeverityConfig(analysis.severity_level);
  const triageConfig = getTriageConfig(analysis.triage_level);
  const SeverityIcon = severityConfig.icon;

  return (
    <div className="space-y-6">
      {/* Analysis Summary */}
      <Card className="border-2 border-teal-200">
        <CardHeader>
          <CardTitle className="text-xl text-teal-700 flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600 mb-2 block">
                  Severity Classification
                </label>
                <Badge className={`${severityConfig.color} border px-3 py-1 text-sm font-medium`}>
                  <SeverityIcon className={`w-4 h-4 mr-2 ${severityConfig.iconColor}`} />
                  {analysis.severity_level.charAt(0).toUpperCase() + analysis.severity_level.slice(1)}
                </Badge>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-600 mb-2 block">
                  Recommended Action
                </label>
                <Badge className={`${triageConfig.color} px-3 py-1 text-sm font-medium`}>
                  {triageConfig.label}
                </Badge>
                <p className="text-xs text-slate-500 mt-1">
                  {triageConfig.description}
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 mb-2 block">
                Clinical Keywords Detected
              </label>
              <div className="flex flex-wrap gap-2">
                {analysis.extracted_keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Response */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Educational Guidance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {analysis.ai_response}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Context */}
      {analysis.environmental_factors && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Environmental Context</CardTitle>
            <p className="text-sm text-slate-600">
              Current conditions that may influence your symptoms
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Wind className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">Pollen</p>
                <p className="text-lg font-bold text-yellow-600">
                  {analysis.environmental_factors.pollen_count}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Activity className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">Air Quality</p>
                <p className="text-lg font-bold text-green-600">
                  {analysis.environmental_factors.air_quality_index}
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Thermometer className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">Temperature</p>
                <p className="text-lg font-bold text-blue-600">
                  {analysis.environmental_factors.temperature}°F
                </p>
              </div>
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <Droplets className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">Humidity</p>
                <p className="text-lg font-bold text-indigo-600">
                  {analysis.environmental_factors.humidity}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Safety Reminder */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Remember:</strong> This analysis is for educational purposes only. 
          If you have concerns about your health, please consult with a healthcare professional.
        </AlertDescription>
      </Alert>
    </div>
  );
}