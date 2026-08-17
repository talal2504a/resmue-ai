"use client";

import Link from "next/link";
import TemplateCard from "@/components/TemplateCard";
import { Sparkles } from "lucide-react";

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with a focus on readability and impact.",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional layout perfect for conservative industries and formal positions.",
    color: "from-gray-700 to-gray-900",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design that lets your content take center stage.",
    color: "from-emerald-600 to-teal-600",
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Templates</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Resume Templates</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Choose from our collection of professionally designed resume templates.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Create Your Resume
          </Link>
        </div>
      </div>
    </div>
  );
}
