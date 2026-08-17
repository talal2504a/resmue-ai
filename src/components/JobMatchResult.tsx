"use client";

interface JobMatchResultProps {
  result: {
    matchScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    keywordGaps: string[];
    suggestions: string[];
  };
}

export default function JobMatchResult({ result }: JobMatchResultProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
        <div className="text-center">
          <div className="text-5xl font-bold text-indigo-600 mb-2">{result.matchScore}%</div>
          <p className="text-lg text-gray-700">Overall Match Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Matched Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.matchedSkills?.map((skill, index) => (
              <span key={index} className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Missing Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.missingSkills?.map((skill, index) => (
              <span key={index} className="bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Keyword Gaps</h3>
        <div className="flex flex-wrap gap-2">
          {result.keywordGaps?.map((keyword, index) => (
            <span key={index} className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-sm font-medium">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Suggestions</h3>
        <ul className="space-y-3">
          {result.suggestions?.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
