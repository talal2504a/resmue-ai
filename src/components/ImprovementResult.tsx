"use client";

import { useState } from "react";
import { Download } from "lucide-react";

interface ImprovementResultProps {
  original: string;
  improved: string;
}

export default function ImprovementResult({ original, improved }: ImprovementResultProps) {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowOriginal(false)}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            !showOriginal
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Improved Version
        </button>
        <button
          onClick={() => setShowOriginal(true)}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
            showOriginal
              ? "bg-gray-800 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Original Version
        </button>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 max-h-96 overflow-y-auto border border-gray-200">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
          {showOriginal ? original : improved}
        </pre>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            const text = showOriginal ? original : improved;
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = showOriginal ? "original-resume.txt" : "improved-resume.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
          className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Download className="w-5 h-5" />
          Download
        </button>
      </div>
    </div>
  );
}
