import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle, RefreshCw } from "lucide-react";

export default function TechniqueFeedback({ analysis, onReset }) {
  const getScoreColor = (score) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStepIcon = (status) => {
    switch (status) {
      case "correct":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "needs_improvement":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "incorrect":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-teal-200 border-2">
        <CardHeader>
          <CardTitle className="text-xl text-teal-700">Technique Analysis Complete</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-slate-600 mb-2">Overall Score</p>
          <div className="text-5xl font-bold mb-4">{analysis.technique_score}%</div>
          <Progress value={analysis.technique_score} className={`h-3 ${getScoreColor(analysis.technique_score)}`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step-by-Step Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {analysis.step_analysis.map((step, index) => (
              <li key={index} className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg">
                <div className="mt-1">{getStepIcon(step.status)}</div>
                <div>
                  <h4 className="font-semibold text-slate-800">{step.step_name}</h4>
                  <p className="text-sm text-slate-600">{step.feedback}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {analysis.improvement_areas.length > 0 &&
        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-700">Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc list-inside text-slate-700">
                {analysis.improvement_areas.map((area, index) => (
                    <li key={index}>{area}</li>
                ))}
            </ul>
          </CardContent>
        </Card>
      }

      <div className="text-center">
        <Button onClick={onReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Analyze Another Video
        </Button>
      </div>
    </div>
  );
}