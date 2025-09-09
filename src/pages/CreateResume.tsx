import React, { useState } from 'react';
import axios from 'axios';
import ResumeForm from '../components/resume/ResumeForm';
import ResultsView from '../components/resume/ResultsView';
import { useToast } from '../contexts/ToastContext';


interface ResumeFormData {
  name: string;
  email: string;
  jobTitle: string;
  company: string;
}


interface ResumeResult {
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  tailoredResume: string;
  coverLetter: string;
  matchScore: number;
}

const CreateResume: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ResumeResult | null>(null);
  const { showToast } = useToast();

  const handleSubmit = async (data: ResumeFormData) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.post<ResumeResult>(
        'http://localhost:5500/generate-resume',
        data
      );

      setResults(response.data);
      showToast('Your tailored documents have been generated!', 'success');
    } catch (error: any) {
      console.error('Error generating documents:', error);
      showToast(
        'Failed to generate documents. Please try again.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResults(null);
  };

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
