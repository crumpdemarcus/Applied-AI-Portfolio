
import React, { useState } from "react";
import { SymptomEntry } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Activity, Send, AlertTriangle, CheckCircle, Clock, Loader2 } from "lucide-react";

import SymptomResponse from "../components/symptom/SymptomResponse";

/**
 * Symptom Check Page
 * This page allows users to input their symptoms in free text.
 * It uses an LLM to analyze the text, extract keywords, classify severity,
 * and provide an educational response.
 */
export default function SymptomCheck() {
  // State to hold the user's free-text symptom description.
  const [symptomText, setSymptomText] = useState("");
  // State to manage the loading status during AI analysis.
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // State to store the structured analysis results from the AI.
  const [analysis, setAnalysis] = useState(null);
  // State for handling any errors during the analysis process.
  const [error, setError] = useState("");

  /**
   * Analyzes the user's symptom description using an AI model.
   * This function handles prompt engineering, calling the LLM, and saving the results.
   */
  const analyzeSymptoms = async () => {
    if (!symptomText.trim()) return;

    setIsAnalyzing(true);
    setError("");

    try {
      // This prompt is carefully engineered to instruct the LLM on its role, the task,
      // and the exact JSON output format required. This is a critical step for reliable results.
      const prompt = `As a healthcare AI assistant, analyze these symptoms for educational purposes only: "${symptomText}"

      Extract clinical keywords, classify severity, and provide educational guidance. Remember this is NOT diagnostic.

      Respond with this exact structure:
      - severity_level: mild/moderate/severe
      - triage_level: self_care/primary_care/urgent  
      - keywords: list of clinical terms found
      - response: patient-friendly educational response (include clear disclaimers)`;

      // Call the LLM integration with the prompt and a defined response schema.
      // The schema ensures the LLM returns data in a predictable, structured format.
      const result = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            severity_level: { type: "string", enum: ["mild", "moderate", "severe"] },
            triage_level: { type: "string", enum: ["self_care", "primary_care", "urgent"] },
            keywords: { type: "array", items: { type: "string" } },
            response: { type: "string" }
          },
          required: ["severity_level", "triage_level", "keywords", "response"]
        }
      });

      // Structure the final data object, including the original description and AI results.
      // Mock environmental factors are added here for contextual display in the response.
      const analysisData = {
        description: symptomText,
        severity_level: result.severity_level,
        triage_level: result.triage_level, 
        extracted_keywords: result.keywords,
        ai_response: result.response,
        environmental_factors: {
          pollen_count: Math.floor(Math.random() * 100),
          air_quality_index: Math.floor(Math.random() * 200),
          weather_conditions: "Clear",
          temperature: 72,
          humidity: 45
        }
      };

      // Save the complete analysis record to the database for historical tracking.
      await SymptomEntry.create(analysisData);
      setAnalysis(analysisData);
      setSymptomText(""); // Clear the input field after successful analysis.

    } catch (err) {
      setError("Unable to analyze symptoms. Please try again.");
      console.error("Analysis error:", err);
    }

    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <Activity className="w-8 h-8 text-teal-600" />
          Symptom Check
        </h1>
        <p className="text-slate-600">
          Describe how you're feeling and get AI-powered educational insights
        </p>
      </div>

      {/* Medical Disclaimer: A prominent safety reminder specific to this feature. */}
      <Alert className="mb-6 border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Important:</strong> This tool provides educational information only. 
          Always consult healthcare professionals for medical concerns, diagnosis, or treatment decisions.
        </AlertDescription>
      </Alert>

      {/* Input Card: Where the user types their symptoms. */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Describe Your Symptoms</CardTitle>
          <p className="text-sm text-slate-600">
            Tell us in your own words how you're feeling. Be as detailed as possible.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Example: I've been wheezing and coughing all night, my chest feels tight, and I'm having trouble sleeping..."
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              rows={4}
              className="resize-none"
              disabled={isAnalyzing}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">
                {symptomText.length}/500 characters
              </span>
              <Button 
                onClick={analyzeSymptoms}
                disabled={!symptomText.trim() || isAnalyzing}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Analyze Symptoms
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Analysis Results: Conditionally renders the response component when analysis is complete. */}
      {analysis && (
        <SymptomResponse analysis={analysis} />
      )}
    </div>
  );
}
