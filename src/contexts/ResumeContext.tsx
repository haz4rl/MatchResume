import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Resume {
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  tailoredResume: string;
  coverLetter: string;
  matchScore: number;
}

interface ResumeContextType {
  resumes: Resume[];
  addResume: (resume: Resume) => void;
  deleteResume: (index: number) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumes, setResumes] = useState<Resume[]>([]);

  const addResume = (resume: Resume) => {
    setResumes((prev) => [resume, ...prev]);
  };

  const deleteResume = (index: number) => {
    setResumes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ResumeContext.Provider value={{ resumes, addResume, deleteResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};
