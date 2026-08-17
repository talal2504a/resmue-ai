"use client";

import Link from "next/link";

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300">
      <div className={`h-48 bg-gradient-to-r ${template.color} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 w-36 h-44 shadow-xl relative">
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{template.name}</h3>
        <p className="text-gray-600 mb-5 text-sm leading-relaxed">{template.description}</p>
        <Link
          href={`/builder?template=${template.id}`}
          className="block w-full text-center bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors font-medium"
        >
          Use Template
        </Link>
      </div>
    </div>
  );
}
