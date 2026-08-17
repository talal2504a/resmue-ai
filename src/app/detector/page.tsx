"use client";

import { useState } from "react";
import ResumeUpload from "@/components/ResumeUpload";
import DetectorResult from "@/components/DetectorResult";
import { useToast } from "@/context/ToastContext";

export default function DetectorPage() {
  const [result, setResult] = useState<{ score: number; indicators: string[]; recommendations: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { addToast } = useToast();

  const handleUpload = async (text: string) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Detection failed");

      const data = await response.json();
      setResult(data);
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
          </div>
        </div>
      </div>
    </div>
  );
}
