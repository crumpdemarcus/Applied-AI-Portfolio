import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Video, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function RecentActivity({ symptoms, assessments, isLoading }) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const allActivity = [
    ...symptoms.map(s => ({
      type: 'symptom',
      data: s,
      timestamp: s.created_date
    })),
    ...assessments.map(a => ({
      type: 'assessment', 
      data: a,
      timestamp: a.created_date
    }))
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "severe":
        return "bg-red-100 text-red-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {allActivity.length === 0 ? (
          <p className="text-slate-500 text-center py-8">
            No recent activity. Start by checking your symptoms or analyzing your inhaler technique.
          </p>
        ) : (
          <div className="space-y-4">
            {allActivity.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'symptom' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  {activity.type === 'symptom' ? (
                    <Activity className={`w-5 h-5 ${activity.type === 'symptom' ? 'text-blue-600' : 'text-purple-600'}`} />
                  ) : (
                    <Video className="w-5 h-5 text-purple-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-slate-900">
                      {activity.type === 'symptom' ? 'Symptom Check' : 'Inhaler Assessment'}
                    </h4>
                    {activity.type === 'symptom' ? (
                      <Badge variant="secondary" className={getSeverityColor(activity.data.severity_level)}>
                        {activity.data.severity_level || 'mild'}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className={getScoreColor(activity.data.technique_score)}>
                        {activity.data.technique_score}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">
                    {activity.type === 'symptom' 
                      ? activity.data.description.substring(0, 100) + (activity.data.description.length > 100 ? '...' : '')
                      : `Technique score: ${activity.data.technique_score}% - ${activity.data.improvement_areas?.length || 0} areas for improvement`
                    }
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {format(new Date(activity.timestamp), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}