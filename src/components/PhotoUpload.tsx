"use client";

import { useState, useCallback } from "react";
import { Upload, AlertCircle, X } from "lucide-react";

interface PhotoUploadProps {
  photo: string | null;
  onPhotoChange: (photo: string | null) => void;
}

export default function PhotoUpload({ photo, onPhotoChange }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const processFile = useCallback((file: File) => {
    setError("");
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPG, JPEG, PNG, or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onPhotoChange(result);
    };
    reader.onerror = () => setError("Failed to read image file.");
    reader.readAsDataURL(file);
  }, [onPhotoChange]);

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
    if (files.length > 0) processFile(files[0]);
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) processFile(files[0]);
  }, [processFile]);

  const removePhoto = useCallback(() => {
    onPhotoChange(null);
    setError("");
  }, [onPhotoChange]);

  if (photo) {
    return (
      <div className="flex items-center gap-4">
        <img
          src={photo}
          alt="Profile preview"
          className="w-20 h-20 rounded-xl object-cover border border-gray-200 shadow-sm"
        />
        <div className="flex flex-col gap-2">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Change Photo
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <button
            type="button"
            onClick={removePhoto}
            className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <X className="w-4 h-4" />
            Remove
          </button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-indigo-500 bg-indigo-50 scale-[1.01]"
            : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
        }`}
      >
        <input
          type="file"
          id="photo-upload"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="photo-upload" className="cursor-pointer">
          <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-3">
            <Upload className="w-6 h-6 text-indigo-500" />
          </div>
          <p className="text-sm font-medium text-gray-900">
            <span className="text-indigo-600 font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1">JPG, JPEG, PNG, WebP up to 5MB</p>
        </label>
      </div>
      {error && (
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 text-sm font-medium rounded-xl border border-red-200">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}
