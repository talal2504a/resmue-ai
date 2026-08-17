"use client";

interface DetectorResultProps {
  score: number;
  indicators: string[];
  recommendations: string;
}

export default function DetectorResult({ score, indicators, recommendations }: DetectorResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-red-600";
    if (score >= 40) return "text-amber-600";
    return "text-emerald-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return "from-red-50 to-pink-50 border-red-100";
    if (score >= 40) return "from-amber-50 to-orange-50 border-amber-100";
    return "from-emerald-50 to-teal-50 border-emerald-100";
  };

  return (
    <div className="space-y-6">
      <div className={`bg-gradient-to-r ${getScoreBg(score)} rounded-2xl p-6 border`}>
        <div className="text-center">
          <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>{score}%</div>
          <p className="text-lg text-gray-700">AI Writing Indicators</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Detected Patterns:</h3>
        <ul className="space-y-3">
          {indicators?.map((indicator, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-gray-700">{indicator}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Recommendations:</h3>
        <p className="text-gray-700">{recommendations}</p>
      </div>
    </div>
  );
}
