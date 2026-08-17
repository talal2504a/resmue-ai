"use client";

import { useToast } from "@/context/ToastContext";
import { X, CheckCircle, XCircle, Info, Loader2 } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 p-4 rounded-2xl shadow-lg border transform transition-all duration-300 hover:scale-[1.02] ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : toast.type === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : toast.type === "loading"
              ? "bg-blue-50 border-blue-200 text-blue-800"
              : "bg-gray-50 border-gray-200 text-gray-800"
          }`}
        >
          <div className="flex-shrink-0">
            {toast.type === "success" && (
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            )}
            {toast.type === "error" && (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            {toast.type === "loading" && (
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            )}
            {toast.type === "info" && (
              <Info className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
