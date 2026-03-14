
import React, { useState, useEffect } from "react";
import { SymptomEntry } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { CloudRain, Loader2, Wind, Sun, Thermometer } from "lucide-react";
import TriggerDataCard from "../components/triggers/TriggerDataCard";
import SymptomEnvironmentChart from "../components/triggers/SymptomEnvironmentChart";

/**
 * Environmental Triggers Page
 * This page displays current environmental data (pollen, AQI, etc.) and
 * visualizes the historical correlation between these factors and the user's
 * logged symptoms, helping to identify potential triggers.
 */
export default function Triggers() {
  // State to manage loading status.
  const [isLoading, setIsLoading] = useState(true);
  // State to store the fetched real-time environmental data.
  const [envData, setEnvData] = useState(null);
  // State to hold the user's symptom history for chart correlation.
  const [symptomHistory, setSymptomHistory] = useState([]);

  // Fetch all necessary data when the component mounts.
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Fetches data from two sources in parallel:
   * 1. The user's symptom history from the app's database.
   * 2. Live environmental data from an external source via an LLM with internet access.
   */
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [symptoms, environmental] = await Promise.all([
        // Get the last 14 days of symptom entries for the trend chart.
        SymptomEntry.list("-created_date", 14),
        // Get live environmental data.
        InvokeLLM({
          prompt: "Provide current pollen index (scale of 1-12), AQI, temperature (F), and a brief weather summary for Chicago, IL.",
          add_context_from_internet: true,
          response_json_schema: {
            type: "object",
            properties: {
              pollen: { type: "number" },
              aqi: { type: "number" },
              temperature: { type: "number" },
              weather: { type: "string" },
            },
          },
        }),
      ]);
      setSymptomHistory(symptoms);
      setEnvData(environmental);
    } catch (error) {
      console.error("Failed to fetch trigger data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <CloudRain className="w-8 h-8 text-teal-600" />
          Environmental Triggers
        </h1>
        <p className="text-slate-600">
          Understand how your local environment might be affecting your symptoms.
        </p>
      </div>

      {/* Display a loading indicator while data is being fetched. */}
      {isLoading ? (
        <div className="text-center py-12">
            <Loader2 className="w-12 h-12 mx-auto text-teal-600 animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Loading environmental data...</p>
        </div>
      ) : (
        <div className="space-y-8">
            {/* Grid of cards showing the current environmental data points. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <TriggerDataCard 
                    icon={Sun} 
                    label="Pollen" 
                    value={envData?.pollen || 'N/A'} 
                    unit="/ 12" 
                    level={envData?.pollen > 8 ? 'High' : envData?.pollen > 4 ? 'Medium' : 'Low'}
                />
                <TriggerDataCard 
                    icon={Wind} 
                    label="Air Quality Index" 
                    value={envData?.aqi || 'N/A'} 
                    level={envData?.aqi > 150 ? 'Unhealthy' : envData?.aqi > 50 ? 'Moderate' : 'Good'}
                />
                <TriggerDataCard 
                    icon={Thermometer} 
                    label="Temperature" 
                    value={envData?.temperature || 'N/A'} 
                    unit="°F" 
                />
                <TriggerDataCard 
                    icon={CloudRain} 
                    label="Weather" 
                    value={envData?.weather || 'N/A'} 
                />
            </div>
            {/* Chart that visualizes the relationship between symptoms and environmental factors over time. */}
            <SymptomEnvironmentChart data={symptomHistory} />
        </div>
      )}
    </div>
  );
}
