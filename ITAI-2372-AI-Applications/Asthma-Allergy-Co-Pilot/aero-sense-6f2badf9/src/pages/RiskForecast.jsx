
import React, { useState, useEffect, useCallback } from "react";
import { RiskAssessment, SymptomEntry } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import RiskGauge from "../components/dashboard/RiskGauge";
import RiskTrendChart from "../components/risk/RiskTrendChart";
import FactorsList from "../components/risk/FactorsList";

/**
 * Risk Forecast Page
 * This page calculates and displays a 72-hour asthma flare-up risk forecast.
 * It combines the user's recent symptom history with real-time environmental data
 * to generate a predictive, educational insight.
 */
export default function RiskForecast() {
  // State to manage loading status during risk calculation.
  const [isCalculating, setIsCalculating] = useState(false);
  // State to hold the current risk assessment object.
  const [risk, setRisk] = useState(null);
  // State to store the last 7 risk assessments for trend visualization.
  const [history, setHistory] = useState([]);
  // State for error handling.
  const [error, setError] = useState("");

  /**
   * Calculates a new risk assessment by querying an LLM.
   * This function aggregates user symptoms and live environmental data,
   * then sends it to the AI for a prediction.
   * Wrapped in useCallback to prevent re-creation on re-renders.
   */
  const calculateNewRisk = useCallback(async () => {
    setIsCalculating(true);
    setError("");

    try {
      // Step 1: Fetch the user's 5 most recent symptom logs.
      const recentSymptoms = await SymptomEntry.list("-created_date", 5);
      // Format the symptoms into a clear summary for the AI prompt.
      const symptomsSummary = recentSymptoms.map(s => `${s.description} (Severity: ${s.severity_level})`).join("\n");

      // Step 2: Fetch live environmental data using an LLM with internet access.
      const envData = await InvokeLLM({
          prompt: "Provide current pollen index (1-100), AQI (1-500), and a brief weather summary for New York, NY.",
          add_context_from_internet: true,
          response_json_schema: { type: "object", properties: { pollen: {type: "number"}, aqi: {type: "number"}, weather: {type: "string"}}}
      });

      // Step 3: Engineer a detailed prompt that combines all data points for the AI.
      const prompt = `Based on recent symptoms:\n${symptomsSummary}\n\nAnd environmental data: Pollen ${envData.pollen}, AQI ${envData.aqi}, Weather: ${envData.weather}.\n\nPredict the 72-hour asthma flare-up risk. Provide a JSON object with: risk_level (low/medium/high), confidence_score (0.0-1.0), contributing_factors (array of strings), and recommendations (array of strings).`;

      // Step 4: Call the LLM with the final prompt and a schema for the response.
      const result = await InvokeLLM({
        prompt: prompt,
        response_json_schema: RiskAssessment.schema()
      });
      
      // Step 5: Save the new risk assessment to the database.
      const newRisk = await RiskAssessment.create(result);
      setRisk(newRisk);
      setHistory(prev => [newRisk, ...prev].slice(0, 7)); // Add to history for the trend chart.

    } catch (err) {
      setError("Unable to calculate risk. Please try again.");
      console.error("Risk calculation error:", err);
    }
    setIsCalculating(false);
  }, []); // Dependencies: State setters (setRisk, setHistory, setIsCalculating, setError) are stable, so no need to list them.

  /**
   * Loads the initial data for the page: either the latest existing risk assessment
   * or calculates a new one if none exists.
   * Wrapped in useCallback.
   */
  const loadInitialData = useCallback(async () => {
    setIsCalculating(true);
    try {
      const riskHistory = await RiskAssessment.list("-created_date", 7);
      setHistory(riskHistory);
      if (riskHistory.length > 0) {
        setRisk(riskHistory[0]);
      } else {
        // If no history, run a new calculation
        await calculateNewRisk();
      }
    } catch (e) {
      setError("Failed to load risk history.");
    }
    setIsCalculating(false);
  }, [calculateNewRisk]); // Dependencies: calculateNewRisk is used inside, and must be stable.

  // useEffect hook to run the initial data load when the component mounts.
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]); // Dependencies: loadInitialData must be stable.

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-teal-600" />
          Risk Forecast
        </h1>
        <p className="text-slate-600">
          AI-powered 72-hour flare-up prediction based on your symptoms and local environment.
        </p>
      </div>

      <Alert className="mb-6 border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          This forecast is an educational estimate, not a medical prediction. Use it to be more mindful of your condition.
        </AlertDescription>
      </Alert>
      
      {/* Button to allow the user to manually trigger a new risk calculation. */}
      <div className="text-center mb-8">
        <Button onClick={calculateNewRisk} disabled={isCalculating}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isCalculating ? "animate-spin" : ""}`} />
          {isCalculating ? "Recalculating..." : "Recalculate Risk Now"}
        </Button>
      </div>

      {error && <Alert variant="destructive" className="mb-6">{error}</Alert>}

      {/* Display area for the risk gauge, contributing factors, and trend chart. */}
      <div className="space-y-8">
        <RiskGauge risk={risk} isLoading={isCalculating} />
        {risk && <FactorsList factors={risk.contributing_factors} recommendations={risk.recommendations} />}
        <RiskTrendChart data={history} />
      </div>
    </div>
  );
}
