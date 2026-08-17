"use client";

import { useState } from "react";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import TemplateSelector from "@/components/TemplateSelector";
import { ResumeData } from "@/components/ResumeForm";
import { ChevronLeft } from "lucide-react";

type Step = "form" | "preview";

export default function BuilderPage() {
  const [step, setStep] = useState<Step>("form");
  const [generatedData, setGeneratedData] = useState<ResumeData | null>(null);
  const [generatedMarkdown, setGeneratedMarkdown] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<"modern" | "classic" | "minimal">("modern");
  const [includePhoto, setIncludePhoto] = useState(false);
  const [documentType, setDocumentType] = useState<"resume" | "cv">("resume");

  const handleGenerate = (data: ResumeData) => {
    setGeneratedData(data);
    setGeneratedMarkdown(data.markdown || "");
    setStep("preview");
  };

  const handleBack = () => {
    setStep("form");
  };

  const handleTemplateChange = (template: "modern" | "classic" | "minimal") => {
    setSelectedTemplate(template);
  };

  const handlePhotoToggle = (include: boolean) => {
    setIncludePhoto(include);
  };

  const handleMarkdownChange = (markdown: string) => {
    setGeneratedMarkdown(markdown);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              {documentType === "cv" ? "AI CV Builder" : "AI Resume Builder"}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              {documentType === "cv"
                ? "Fill in your details or describe yourself with AI, then preview, edit, and download your professional CV."
                : "Fill in your details or describe yourself with AI, then preview, edit, and download your professional resume."}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {step === "form" ? (
          <div className="space-y-6">
            {/* Form at top */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
              <ResumeForm onGenerate={handleGenerate} documentType={documentType} />
            </div>

            {/* Template + Document Type grid below form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
                <TemplateSelector selected={selectedTemplate} onSelect={handleTemplateChange} />
              </div>
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Document Type</h3>
                <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setDocumentType("resume")}
                    className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                      documentType === "resume" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Resume
                  </button>
                  <button
                    type="button"
                    onClick={() => setDocumentType("cv")}
                    className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                      documentType === "cv" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    CV
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  {documentType === "resume"
                    ? "Resume: concise 1-2 pages, focused on relevant experience and skills for a specific job."
                    : "CV: comprehensive academic/professional history including publications, research, and presentations."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Form
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Type:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {(["resume", "cv"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setDocumentType(type)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                        documentType === type ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-4">Template:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {(["modern", "classic", "minimal"] as const).map((tpl) => (
                    <button
                      key={tpl}
                      type="button"
                      onClick={() => handleTemplateChange(tpl)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                        selectedTemplate === tpl ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tpl}
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-700 ml-4">
                  <input
                    type="checkbox"
                    checked={includePhoto}
                    onChange={(e) => handlePhotoToggle(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  />
                  Include Photo
                </label>
              </div>
            </div>
            <ResumePreview
              data={generatedData}
              markdown={generatedMarkdown}
              selectedTemplate={selectedTemplate}
              includePhoto={includePhoto}
              documentType={documentType}
              onPhotoToggle={handlePhotoToggle}
              onMarkdownChange={handleMarkdownChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
