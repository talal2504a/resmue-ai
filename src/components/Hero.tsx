"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, BarChart3, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-100 via-blue-100 to-cyan-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-pink-50 to-transparent rounded-full blur-3xl opacity-40" />
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 blur-xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-700 text-sm font-medium mb-6 sm:mb-8 animate-fade-in-up shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Resume Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Build resumes that
            <span className="relative">
              <span className="relative z-10 text-indigo-600">
                {" "}actually land interviews
              </span>
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up px-4 sm:px-0" style={{ animationDelay: "0.2s" }}>
            Create, analyze, improve, and optimize your resume with cutting-edge AI. Stand out from the crowd and get noticed by top employers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up px-4 sm:px-0" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/builder"
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <Heart className="w-5 h-5" />
              Create Your Resume
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/detector"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto shadow-sm hover:shadow-md"
            >
              <BarChart3 className="w-5 h-5" />
              Analyze Resume
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">Resumes Created</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">92%</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">Success Rate</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">4.9</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
