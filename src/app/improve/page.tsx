"use client";

import { useState } from "react";
import ResumeUpload from "@/components/ResumeUpload";
import ImprovementResult from "@/components/ImprovementResult";
import { useToast } from "@/context/ToastContext";

export default function ImprovePage() {
  const [originalText, setOriginalText] = useState("");
  const [improvedText, setImprovedText] = useState("");
  const [isImproving, setIsImproving] = useState(false);
  const { addToast } = useToast();

  const handleUpload = async (text: string) => {
    setOriginalText(text);
    setIsImproving(true);

    try {
      const response = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: text }),
      });

      if (!response.ok) throw new Error("Improvement failed");

      const data = await response.json();
      setImprovedText(data.improvedResume);
      addToast("Resume improved successfully!", "success");
    } catch (error) {
      console.error("Error:", error);
      addToast("Failed to improve resume. Please try again.", "error");
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              Resume Improver
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Upload your resume and let AI enhance it with better wording, structure, and impact.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              Original Resume
            </h2>
            <ResumeUpload onUpload={handleUpload} />

            {originalText && !isImproving && (
              <div className="mt-4 sm:mt-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Extracted Text:</h3>
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4 max-h-64 sm:max-h-96 overflow-y-auto border border-gray-100">
                  <pre className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap">{originalText}</pre>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600 font-bold text-sm">2</span>
              </div>
              Improved Resume
            </h2>
            {isImproving ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-20">
                <div className="relative">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-indigo-100 border-t-indigo-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-600 rounded-full opacity-20 animate-pulse"></div>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 font-medium">Improving your resume...</p>
                <p className="text-sm text-gray-500 mt-1">This may take a few seconds</p>
              </div>
            ) : improvedText ? (
              <ImprovementResult original={originalText} improved={improvedText} />
            ) : (
              <div className="text-center py-12 sm:py-20">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">Upload a resume to see improvements</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
