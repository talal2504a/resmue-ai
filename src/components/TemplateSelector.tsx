"use client";

import { Check } from "lucide-react";

type TemplateType = "modern" | "classic" | "minimal";

interface TemplateSelectorProps {
  selected: TemplateType;
  onSelect: (template: TemplateType) => void;
}

const templates = [
  {
    id: "modern" as TemplateType,
    name: "Modern",
    description: "Clean sidebar layout with accent colors",
  },
  {
    id: "classic" as TemplateType,
    name: "Classic",
    description: "Traditional serif font with formal structure",
  },
  {
    id: "minimal" as TemplateType,
    name: "Minimal",
    description: "Ultra-clean with whitespace and light typography",
  },
];

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">Choose Template</label>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            type="button"
            onClick={() => onSelect(tpl.id)}
            className={`relative rounded-xl border-2 p-4 text-center transition-all ${
              selected === tpl.id
                ? "border-indigo-600 bg-indigo-50 shadow-sm"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            {selected === tpl.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            <div className="text-sm font-semibold text-gray-900 mb-1">{tpl.name}</div>
            <div className="text-xs text-gray-500">{tpl.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
