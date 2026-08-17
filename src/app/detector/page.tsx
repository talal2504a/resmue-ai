"use client";

import { useState } from "react";
import ResumeUpload from "@/components/ResumeUpload";
import DetectorResult from "@/components/DetectorResult";
import { useToast } from "@/context/ToastContext";

export default function DetectorPage() {
  const [result, setResult] = useState<{ score: number; indicators: string[]; recommendations: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [manualText, setManualText] = useState("");
  const { addToast } = useToast();

  const handleUpload = async (text: string) => {
    if (!text.trim()) {
      addToast("No text found in file. Try a text-based PDF, DOCX, or paste text manually below.", "error");
      return;
    }
    await analyzeText(text);
  };

  const handleManualAnalyze = async () => {
    if (!manualText.trim()) {
      addToast("Please enter some text to analyze.", "error");
      return;
    }
    await analyzeText(manualText);
  };

  const analyzeText = async (text: string) => {
    setIsAnalyzing(true);
    setResult(null);
    try {
      const response = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.detail || data.error || "Detection failed";
        addToast(errorMessage, "error");
        return;
      }

      if (data.error) {
        addToast(data.detail || data.error, "error");
        return;
      }

      setResult(data);
      addToast("Analysis complete!", "success");
    } catch (error) {
      console.error("Error:", error);
      addToast("Failed to analyze resume. Please try again.", "error");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">AI Resume Detector</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your resume to detect AI-generated content and get an authenticity score.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <ResumeUpload onUpload={handleUpload} />

            {isAnalyzing && (
              <div className="mt-8 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-600">Analyzing your resume...</p>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="mt-8">
                <DetectorResult score={result.score} indicators={result.indicators} recommendations={result.recommendations} />
              </div>
            )}

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Or paste your resume text here:</h3>
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 resize-none"
                placeholder="Paste your resume text here if file upload doesn't work..."
              />
              <button
                type="button"
                onClick={handleManualAnalyze}
                disabled={isAnalyzing || !manualText.trim()}
                className="mt-4 w-full py-3 px-6 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Analyze Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
