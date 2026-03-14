
import React, { useState } from "react";
import { InhalerAssessment } from "@/api/entities";
import { UploadFile } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Video, AlertTriangle, Loader2, FileUp, PlayCircle } from "lucide-react";
import TechniqueFeedback from "../components/inhaler/TechniqueFeedback";

/**
 * MOCK_ANALYSIS
 * This is a set of predefined, synthetic data to simulate the output of a
 * real computer vision AI model for inhaler technique. In a production app,
 * this would be replaced by a real AI service call. Using mock data allows
 * the UI to be fully functional and demonstrate the feature's value.
 */
const MOCK_ANALYSIS = [
  {
    technique_score: 92,
    step_analysis: [
      { step_name: "Shake inhaler", status: "correct", feedback: "Excellent, vigorous shaking." },
      { step_name: "Exhale fully", status: "correct", feedback: "Good, complete exhalation." },
      { step_name: "Seal lips", status: "correct", feedback: "Perfect seal around the mouthpiece." },
      { step_name: "Inhale slowly", status: "correct", feedback: "Great coordination with actuation." },
      { step_name: "Hold breath", status: "correct", feedback: "Held breath for the recommended 10 seconds." },
    ],
    inhaler_type: "mdi",
    improvement_areas: [],
  },
  {
    technique_score: 74,
    step_analysis: [
      { step_name: "Shake inhaler", status: "correct", feedback: "Good shaking." },
      { step_name: "Exhale fully", status: "needs_improvement", feedback: "Try to exhale more completely before inhaling." },
      { step_name: "Seal lips", status: "correct", feedback: "Lips are sealed well." },
      { step_name: "Inhale slowly", status: "needs_improvement", feedback: "Inhalation was a bit too fast. A slow, deep breath is best." },
      { step_name: "Hold breath", status: "correct", feedback: "Good breath hold." },
    ],
    inhaler_type: "mdi",
    improvement_areas: ["Exhalation", "Inhalation speed"],
  },
  {
    technique_score: 58,
    step_analysis: [
      { step_name: "Shake inhaler", status: "correct", feedback: "Shaking was adequate." },
      { step_name: "Exhale fully", status: "correct", feedback: "Good exhalation." },
      { step_name: "Seal lips", status: "incorrect", feedback: "A gap was detected, allowing medication to escape." },
      { step_name: "Inhale slowly", status: "incorrect", feedback: "Inhalation started before actuating the inhaler." },
      { step_name: "Hold breath", status: "needs_improvement", feedback: "Breath hold was shorter than 10 seconds." },
    ],
    inhaler_type: "mdi",
    improvement_areas: ["Lip seal", "Coordination", "Breath hold"],
  }
];

/**
 * Inhaler Technique Page
 * Allows users to upload a video of their inhaler use. The app then
 * simulates an AI analysis and provides step-by-step educational feedback.
 */
export default function InhalerTechnique() {
  // State to manage the loading status during video upload and analysis.
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // State to hold the analysis results.
  const [analysis, setAnalysis] = useState(null);
  // State for handling errors.
  const [error, setError] = useState("");
  // State for the selected video file.
  const [file, setFile] = useState(null);
  // Ref to programmatically access the hidden file input element.
  const fileInputRef = React.useRef(null);

  /**
   * Handles the selection of a video file from the user's device.
   * Validates the file type to ensure it's a video.
   */
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please select a valid video file.");
    }
  };

  /**
   * Simulates the process of analyzing a user's inhaler technique video.
   * It involves uploading the video, simulating AI processing, and then saving the result.
   */
  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError("");
    setAnalysis(null);

    try {
      // Step 1: Upload the file to secure storage. This returns a URL.
      const { file_url } = await UploadFile({ file });

      // Step 2: Simulate the time it would take for a real AI model to process the video.
      await new Promise(resolve => setTimeout(resolve, 3000)); 
      
      // Step 3: Pick a random result from the predefined mock data to simulate AI output.
      const mockResult = MOCK_ANALYSIS[Math.floor(Math.random() * MOCK_ANALYSIS.length)];
      const analysisData = { ...mockResult, video_url: file_url };

      // Step 4: Save the simulated assessment result to the database for user history.
      const savedAssessment = await InhalerAssessment.create(analysisData);
      setAnalysis(savedAssessment);
      setFile(null); // Clear the selected file.

    } catch (err) {
      setError("Failed to analyze the video. Please try again.");
      console.error("Analysis error:", err);
    }

    setIsAnalyzing(false);
  };
  
  /**
   * Provides a demonstration of the analysis feature without requiring a video upload.
   * It uses a predefined mock analysis result for demonstration purposes.
   */
  const handleDemo = async () => {
    setIsAnalyzing(true);
    setError("");
    setAnalysis(null);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockResult = MOCK_ANALYSIS[1]; // Use a specific, illustrative demo result.
    setAnalysis(mockResult);
    setIsAnalyzing(false);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <Video className="w-8 h-8 text-teal-600" />
          Inhaler Technique Analyzer
        </h1>
        <p className="text-slate-600">
          Get educational feedback on your inhaler technique to maximize medication delivery.
        </p>
      </div>

      {/* Safety disclaimer specific to the technique analysis feature. */}
      <Alert className="mb-6 border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          This feature provides educational feedback only and is not a substitute for training from a healthcare professional.
        </AlertDescription>
      </Alert>

      {/* Show the upload card only if no analysis has been performed yet. */}
      {!analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Upload Your Video</CardTitle>
            <p className="text-sm text-slate-600">
              Upload a short video of you using your inhaler for analysis.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-lg text-center">
              <FileUp className="w-12 h-12 text-slate-400 mb-4" />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current.click()}
                disabled={isAnalyzing}
              >
                Choose Video File
              </Button>
              {file && (
                <p className="text-sm text-slate-600 mt-4">
                  Selected: <strong>{file.name}</strong>
                </p>
              )}
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button
                  onClick={handleAnalyze}
                  disabled={!file || isAnalyzing}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : "Analyze My Technique"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleDemo}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  View Demo Analysis
                </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Show a loading indicator while the analysis is in progress. */}
      {isAnalyzing && !analysis && (
        <div className="text-center py-12">
            <Loader2 className="w-12 h-12 mx-auto text-teal-600 animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Analyzing your technique, please wait...</p>
        </div>
      )}

      {/* Show the feedback component once the analysis is complete. */}
      {analysis && (
        <TechniqueFeedback 
          analysis={analysis} 
          onReset={() => setAnalysis(null)} 
        />
      )}
    </div>
  );
}
