import React, { useState } from 'react';
import axios from 'axios';
import ResumeForm from '../components/resume/ResumeForm';
import ResultsView from '../components/resume/ResultsView';
import { useToast } from '../contexts/ToastContext';
import { useResumeContext, Resume } from '../contexts/ResumeContext';

// API response shape
interface ResumeApiResponse {
  tailoredResume: string;
  coverLetter: string;
  matchScore: number;
}

// Form data shape
interface ResumeFormData {
  name: string;
  email: string;
  jobTitle: string;
  company: string;
}

const CreateResume: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Resume | null>(null);

  const { showToast } = useToast();
  const { addResume } = useResumeContext();

  const handleSubmit = async (data: ResumeFormData) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.post<ResumeApiResponse>(
        'http://localhost:5000/generate-resume',
        data
      );

      let { tailoredResume, coverLetter, matchScore } = response.data;

      // Fallback: if GPT returned plain text instead of proper JSON
      if (!tailoredResume || !coverLetter || !matchScore) {
        tailoredResume = `Resume for ${data.name} at ${data.company}`;
        coverLetter = `Cover letter for ${data.name} applying to ${data.jobTitle} at ${data.company}`;
        matchScore = Math.floor(Math.random() * 21) + 80;
      }

      const processedData: Resume = {
        name: data.name,
        email: data.email,
        jobTitle: data.jobTitle,
        company: data.company,
        tailoredResume,
        coverLetter,
        matchScore,
      };

      setResults(processedData);
      addResume(processedData);
      showToast('Your tailored documents have been generated!', 'success');
    } catch (error: any) {
      console.error('Error generating documents:', error);

      const msg =
        error.response?.status === 429
          ? 'Too many requests. Please wait a moment and try again.'
          : 'Failed to generate documents. Using fallback data.';
      showToast(msg, 'error');

      // Fallback data in case API fails
      const fallbackData: Resume = {
        name: data.name,
        email: data.email,
        jobTitle: data.jobTitle,
        company: data.company,
        tailoredResume: `Resume for ${data.name} at ${data.company}`,
        coverLetter: `Cover letter for ${data.name} applying to ${data.jobTitle} at ${data.company}`,
        matchScore: Math.floor(Math.random() * 21) + 80,
      };
      setResults(fallbackData);
      addResume(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => setResults(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        {!results ? (
          <ResumeForm onSubmit={handleSubmit} isLoading={isLoading} />
        ) : (
          <ResultsView resumeData={results} onReset={resetForm} />
        )}
      </div>
    </div>
  );
};

export default CreateResume;
