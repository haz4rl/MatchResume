import React, { useState } from 'react';
import { Target } from 'lucide-react';

interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

const ATSTracker: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeATS = () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const analysis = performATSAnalysis(resumeText, jobDescription);
      setResult(analysis);
      setLoading(false);
    }, 500);
  };

  const performATSAnalysis = (resume: string, jobDesc: string): ATSResult => {
    const resumeWords = extractKeywords(resume.toLowerCase());
    const jobWords = extractKeywords(jobDesc.toLowerCase());
    const matchedKeywords = resumeWords.filter((w) => jobWords.includes(w));
    const missingKeywords = jobWords.filter((w) => !resumeWords.includes(w)).slice(0, 10);
    const score = Math.min(Math.round((matchedKeywords.length / jobWords.length) * 100), 100);

    const suggestions = [
      score < 80 ? `Consider adding keywords: ${missingKeywords.join(', ')}` : 'Great match!',
    ];

    return { score, matchedKeywords, missingKeywords, suggestions };
  };

  const extractKeywords = (text: string) => {
    const commonWords = [
      'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
      'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has',
      'had', 'do', 'does', 'did', 'a', 'an',
    ];
    return text
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !commonWords.includes(w))
      .filter((w, i, a) => a.indexOf(w) === i);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setResumeText(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Target className="text-blue-600" /> ATS Tracker
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Resume</label>
          <textarea
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Paste your resume text..."
            rows={10}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Job Description</label>
          <textarea
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Paste the job description..."
            rows={10}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="block text-sm text-gray-600"
        />
      </div>

      <button
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
        onClick={analyzeATS}
        disabled={loading || !resumeText || !jobDescription}
      >
        {loading ? 'Analyzing...' : 'Analyze ATS Score'}
      </button>

      {result && (
        <div className="mt-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          {/* Score */}
          <div className="mb-4">
            <div className="text-xl font-bold mb-2">Score: {result.score}%</div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  result.score >= 80 ? 'bg-green-500' : 'bg-yellow-500'
                }`}
                style={{ width: `${result.score}%` }}
              ></div>
            </div>
          </div>

          {/* Matched keywords */}
          <div className="mb-4">
            <strong>Matched Keywords:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {result.matchedKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Missing keywords */}
          <div className="mb-4">
            <strong>Missing Keywords:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {result.missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <strong>Suggestions:</strong>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              {result.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSTracker;
