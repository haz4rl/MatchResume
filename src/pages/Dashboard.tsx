import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Clock, Download, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useResumeContext } from '../contexts/ResumeContext';

const Dashboard: React.FC = () => {
  const { resumes, deleteResume } = useResumeContext();
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const goToATS = () => navigate('/app/ats-tracker');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">My Tailored Resumes</h1>
          <p className="mt-1 text-gray-600">Manage your tailored resumes and cover letters</p>
        </div>

        <div className="flex gap-2">
          <Link to="/app/create">
            <Button variant="primary" icon={<PlusCircle className="h-4 w-4" />}>
              Create New
            </Button>
          </Link>

          <Button variant="secondary" onClick={goToATS}>
            ATS Tracker
          </Button>
        </div>
      </div>

      {resumes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{resume.jobTitle}</h3>
                  <p className="text-gray-600">{resume.company}</p>
                </div>
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                    ${
                      resume.matchScore >= 90
                        ? 'bg-success/10 text-success'
                        : resume.matchScore >= 80
                        ? 'bg-primary/10 text-primary'
                        : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {resume.matchScore}% Match
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                Created on {formatDate(new Date())}
              </div>

              <div className="mt-6 flex justify-between gap-2">
                <Button variant="outline" icon={<Download className="h-4 w-4" />} size="sm">
                  Download
                </Button>
                <Button
                  variant="outline"
                  icon={<Trash2 className="h-4 w-4" />}
                  onClick={() => deleteResume(index)}
                  size="sm"
                  className="text-error border-error/30 hover:bg-error/5"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-12">
          <h3 className="text-xl font-semibold text-gray-900">No resumes yet</h3>
          <p className="mt-2 text-gray-600">Start by creating your first tailored resume</p>
          <div className="mt-6">
            <Link to="/app/create">
              <Button variant="primary" icon={<PlusCircle className="h-4 w-4" />}>
                Create New Resume
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
