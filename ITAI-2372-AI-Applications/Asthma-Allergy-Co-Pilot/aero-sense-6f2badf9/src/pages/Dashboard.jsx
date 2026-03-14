
import React, { useState, useEffect } from "react";
import { SymptomEntry, RiskAssessment, InhalerAssessment } from "@/api/entities";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  CloudRain, 
  TrendingUp, 
  Video, 
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

import RiskGauge from "../components/dashboard/RiskGauge";
import EnvironmentalCard from "../components/dashboard/EnvironmentalCard";
import RecentActivity from "../components/dashboard/RecentActivity";

/**
 * Dashboard Page (Home Screen)
 * This is the main landing page for the user after logging in.
 * It provides a high-level overview of their current risk status,
 * environmental conditions, quick actions, and recent activity.
 */
export default function Dashboard() {
  // State for storing the user's most recent symptom log entries.
  const [recentSymptoms, setRecentSymptoms] = useState([]);
  // State for the latest calculated 72-hour flare-up risk assessment.
  const [currentRisk, setCurrentRisk] = useState(null);
  // State for recent inhaler technique assessments.
  const [recentAssessments, setRecentAssessments] = useState([]);
  // State to manage loading indicators while fetching data.
  const [isLoading, setIsLoading] = useState(true);

  // On component mount, fetch all necessary data for the dashboard.
  useEffect(() => {
    loadDashboardData();
  }, []);

  /**
   * Fetches all required data for the dashboard in parallel.
   * This includes the latest symptom entries, risk assessments, and inhaler technique scores.
   */
  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Use Promise.all to fetch data concurrently for better performance.
      const [symptoms, risks, assessments] = await Promise.all([
        SymptomEntry.list("-created_date", 5), // Get the 5 most recent symptoms
        RiskAssessment.list("-created_date", 1), // Get the single latest risk assessment
        InhalerAssessment.list("-created_date", 3) // Get the 3 most recent technique scores
      ]);
      
      setRecentSymptoms(symptoms);
      setCurrentRisk(risks[0] || null); // Use the latest risk, or null if none exists
      setRecentAssessments(assessments);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  // Defines the quick action cards that allow users to navigate to key app features.
  const quickActions = [
    {
      title: "Check Symptoms",
      description: "Describe how you're feeling",
      icon: Activity,
      path: "SymptomCheck",
      color: "bg-blue-500"
    },
    {
      title: "View Triggers",
      description: "Environmental conditions",
      icon: CloudRain, 
      path: "Triggers",
      color: "bg-green-500"
    },
    {
      title: "Risk Forecast", 
      description: "72-hour predictions",
      icon: TrendingUp,
      path: "RiskForecast", 
      color: "bg-orange-500"
    },
    {
      title: "Inhaler Technique",
      description: "Improve your technique",
      icon: Video,
      path: "InhalerTechnique",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome to AeroSense
        </h1>
        <p className="text-slate-600">
          Your AI-powered companion for asthma and allergy management
        </p>
      </div>

      {/* Current Risk Status: Renders the main risk gauge component. */}
      <div className="mb-8">
        <RiskGauge 
          risk={currentRisk}
          isLoading={isLoading}
        />
      </div>

      {/* Environmental Cards: Shows current local environmental conditions (pollen, AQI, etc.). */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <EnvironmentalCard
          type="pollen"
          title="Pollen Count" 
          value="Medium"
          trend="stable"
          color="text-yellow-600"
          bgColor="bg-yellow-50"
        />
        <EnvironmentalCard
          type="air_quality"
          title="Air Quality"
          value="Good" 
          trend="improving"
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <EnvironmentalCard
          type="weather"
          title="Weather"
          value="Clear"
          trend="stable"
          color="text-blue-600" 
          bgColor="bg-blue-50"
        />
      </div>

      {/* Quick Actions: A grid of cards for easy navigation to main features. */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={createPageUrl(action.path)}>
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-slate-600">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity: Displays a combined list of recent symptom logs and technique assessments. */}
      <RecentActivity 
        symptoms={recentSymptoms}
        assessments={recentAssessments}
        isLoading={isLoading}
      />
    </div>
  );
}
