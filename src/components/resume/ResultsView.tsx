import React, { useRef } from 'react';
import { Download, Copy, Mail, RefreshCw, BarChart3 } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type ResultsViewProps = {
  resumeData: {
    name: string;
    email: string;
    jobTitle: string;
    company: string;
    tailoredResume: string;
    coverLetter: string;
    matchScore: number;
  };
  onReset: () => void;
};

const ResultsView: React.FC<ResultsViewProps> = ({ resumeData, onReset }) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const coverLetterRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async (contentRef: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!contentRef.current) return;
    
    const canvas = await html2canvas(contentRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, would show a toast notification here
  };

  return (
    <div className="w-full max-w-6xl animate-fadeIn">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Tailored Documents</h2>
          <p className="text-gray-600">Ready to help you land that interview at {resumeData.company}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <span className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Match Score: {resumeData.matchScore}%
            </span>
          </div>
          <Button 
            variant="outline" 
            icon={<RefreshCw className="h-4 w-4" />}
            onClick={onReset}
          >
            Start Over
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Tailored Resume */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Tailored Resume</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                icon={<Copy className="h-4 w-4" />}
                onClick={() => copyToClipboard(resumeData.tailoredResume)}
              >
                Copy
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                icon={<Download className="h-4 w-4" />}
                onClick={() => downloadPDF(resumeRef, `${resumeData.name} - Resume - ${resumeData.company}.pdf`)}
              >
                Download
              </Button>
            </div>
          </div>
          
          <Card>
            <div 
              ref={resumeRef} 
              className="prose max-w-none overflow-auto"
              style={{ maxHeight: '60vh' }}
            >
              <div className="border-b pb-4">
                <h1 className="mb-1 text-2xl font-bold">{resumeData.name}</h1>
                <p className="flex items-center text-gray-600">
                  <Mail className="mr-2 h-4 w-4" />
                  {resumeData.email}
                </p>
              </div>
              <div className="mt-4 whitespace-pre-line">
                {resumeData.tailoredResume}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Cover Letter */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Cover Letter</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                icon={<Copy className="h-4 w-4" />}
                onClick={() => copyToClipboard(resumeData.coverLetter)}
              >
                Copy
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                icon={<Download className="h-4 w-4" />}
                onClick={() => downloadPDF(coverLetterRef, `${resumeData.name} - Cover Letter - ${resumeData.company}.pdf`)}
              >
                Download
              </Button>
            </div>
          </div>
          
          <Card>
            <div 
              ref={coverLetterRef} 
              className="prose max-w-none overflow-auto"
              style={{ maxHeight: '60vh' }}
            >
              <div className="border-b pb-4">
                <h1 className="mb-1 text-2xl font-bold">{resumeData.name}</h1>
                <p className="flex items-center text-gray-600">
                  <Mail className="mr-2 h-4 w-4" />
                  {resumeData.email}
                </p>
              </div>
              <div className="mt-4 whitespace-pre-line">
                {resumeData.coverLetter}
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <p className="mb-6 text-gray-700">
          Ready to apply? Download both documents and submit them with your application.
        </p>
        <Button 
          variant="primary" 
          size="lg"
          icon={<Download className="h-5 w-5" />}
          onClick={() => {
            downloadPDF(resumeRef, `${resumeData.name} - Resume - ${resumeData.company}.pdf`);
            setTimeout(() => {
              downloadPDF(coverLetterRef, `${resumeData.name} - Cover Letter - ${resumeData.company}.pdf`);
            }, 500);
          }}
        >
          Download All Documents
        </Button>
      </div>
    </div>
  );
};

export default ResultsView;