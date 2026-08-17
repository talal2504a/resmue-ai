"use client";

import { useState, useCallback } from "react";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

interface ResumeUploadProps {
  onUpload: (text: string) => void;
  accept?: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function ResumeUpload({ onUpload, accept = ".pdf,.docx,.txt,.md,.csv,.json" }: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  const extractDocxText = useCallback(async (file: File): Promise<string> => {
    try {
      const mammoth = (await import('mammoth')).default;
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    } catch (err) {
      console.error("DOCX extraction error:", err);
      throw new Error("Failed to read DOCX file. The file may be corrupted or password protected.");
    }
  }, []);

  const extractTextFromFile = useCallback(async (file: File): Promise<string> => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    try {
      if (fileExtension === 'txt' || fileExtension === 'md' || fileExtension === 'csv' || fileExtension === 'json') {
        return await readFileAsText(file);
      } else if (fileExtension === 'docx') {
        return await extractDocxText(file);
      } else {
        return "";
      }
    } catch (err) {
      console.error("Text extraction error:", err);
      throw new Error(`Could not extract text from ${file.name}. Please try a different file format.`);
    }
  }, [extractDocxText]);

  const processFile = useCallback(async (file: File) => {
    setFileName(file.name);
    setError("");

    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let text = "";

      if (fileExtension === 'pdf') {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${BACKEND_URL}/api/upload/extract-text`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Failed to extract text from PDF");
        }

        if (!data.success || !data.text) {
          const errorMsg = data.message || `No readable text found in "${file.name}". If this is a scanned/image-based PDF, please use a text-based PDF, DOCX, or paste the text manually.`;
          setError(errorMsg);
          onUpload("");
          return;
        }

        text = data.text;
      } else {
        text = await extractTextFromFile(file);
      }

      console.log("Extracted text length:", text.length, "from file:", file.name);

      if (!text.trim()) {
        const errorMsg = `No readable text found in "${file.name}". If this is a scanned/image-based PDF, please use a text-based PDF, DOCX, or paste the text manually below.`;
        setError(errorMsg);
        onUpload("");
      } else {
        onUpload(text);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process file";
      console.error("File processing error:", err);
      setError(errorMessage);
      onUpload("");
    }
  }, [onUpload, extractTextFromFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-indigo-500 bg-indigo-50/80 scale-[1.02]"
            : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
        }`}
      >
        <input
          type="file"
          id="resume-upload"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="resume-upload" className="cursor-pointer">
          <div className={`mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 transition-all ${
            isDragging ? "bg-indigo-100 scale-110" : "bg-indigo-50"
          }`}>
            <Upload className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${isDragging ? "text-indigo-600" : "text-indigo-500"}`} />
          </div>
          <p className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            <span className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Click to upload
            </span>{" "}
            <span className="hidden sm:inline">or drag and drop</span>
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            PDF, DOCX, TXT, MD, CSV, JSON up to 10MB
          </p>
        </label>
      </div>

      {fileName && !error && (
        <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-medium rounded-xl border border-emerald-200 animate-fade-in-up">
          <CheckCircle className="w-4 h-4" />
          {fileName}
        </div>
      )}

      {error && (
        <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-50 text-red-700 text-xs sm:text-sm font-medium rounded-xl border border-red-200 animate-fade-in-up">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}

