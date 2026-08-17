"use client";

import { useState } from "react";
import { ModernTemplate, ResumeData } from "@/components/templates/ModernTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { Edit3, Download, Eye, FileText } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData | null;
  markdown: string;
  selectedTemplate: "modern" | "classic" | "minimal";
  includePhoto: boolean;
  documentType: "resume" | "cv";
  onPhotoToggle: (include: boolean) => void;
  onMarkdownChange: (markdown: string) => void;
}

export default function ResumePreview({
  data,
  markdown,
  selectedTemplate,
  includePhoto,
  documentType,
  onPhotoToggle,
  onMarkdownChange,
}: ResumePreviewProps) {
  const [mode, setMode] = useState<"preview" | "edit">("preview");

  const renderTemplate = () => {
    if (!data) return null;
    const templateProps = { data, photo: data.photo, includePhoto };

    switch (selectedTemplate) {
      case "classic":
        return <ClassicTemplate {...templateProps} />;
      case "minimal":
        return <MinimalTemplate {...templateProps} />;
      case "modern":
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("resume-preview-content");
    if (!element) return;

    try {
      const { default: html2canvas } = await import("html2canvas");
      const { default: jsPDF } = await import("jspdf");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${data?.personalInfo.name || (documentType === "cv" ? "cv" : "resume")}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
        <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No {documentType === "cv" ? "CV" : "Resume"} Generated Yet</h3>
        <p className="text-gray-500">Fill out the form and click &quot;Generate {documentType === "cv" ? "CV" : "Resume"}&quot; to see your AI-powered {documentType === "cv" ? "CV" : "resume"} here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Controls */}
      <div className="border-b border-gray-200 p-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === "preview" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            type="button"
            onClick={() => setMode("edit")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === "edit" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={includePhoto}
              onChange={(e) => onPhotoToggle(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            Include Photo
          </label>
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {mode === "preview" ? (
          <div className="border border-gray-200 rounded-xl overflow-auto max-h-[800px] shadow-inner">
            <div id="resume-preview-content" className="bg-white">
              {renderTemplate()}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Markdown Editor
              </h3>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => onMarkdownChange(e.target.value)}
              rows={30}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 font-mono text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}
