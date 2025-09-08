import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Briefcase, FileText, ArrowRight } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Card from '../ui/Card';

type ResumeFormValues = {
  name: string;
  email: string;
  resumeText: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
};

type ResumeFormProps = {
  onSubmit: (data: ResumeFormValues) => void;
  isLoading: boolean;
};

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit, isLoading }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ResumeFormValues>({
    defaultValues: {
      name: '',
      email: '',
      resumeText: '',
      jobTitle: '',
      company: '',
      jobDescription: '',
    }
  });

  const resumeText = watch('resumeText');
  const jobDescription = watch('jobDescription');

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setResumeFile(acceptedFiles[0]);
        // In a real app, we would parse the file content here
        // For demo purposes, we'll just set a placeholder
        setValue('resumeText', 'Your resume content would be extracted here in a real application.');
      }
    }
  });

  const nextStep = () => {
    setActiveStep(prev => prev + 1);
  };

  const prevStep = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleFormSubmit = (data: ResumeFormValues) => {
    onSubmit(data);
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              activeStep >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-300 text-gray-500'
            }`}>
              1
            </div>
            <div className={`mx-4 h-1 w-16 ${
              activeStep >= 2 ? 'bg-primary' : 'bg-gray-300'
            }`}></div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              activeStep >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-300 text-gray-500'
            }`}>
              2
            </div>
            <div className={`mx-4 h-1 w-16 ${
              activeStep >= 3 ? 'bg-primary' : 'bg-gray-300'
            }`}></div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              activeStep >= 3 ? 'border-primary bg-primary text-white' : 'border-gray-300 text-gray-500'
            }`}>
              3
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {activeStep === 1 && (
          <Card className="animate-fadeIn">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Your Information</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Full Name"
                id="name"
                placeholder="Enter your full name"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />
              
              <Input
                label="Email"
                id="email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  }
                })}
              />
            </div>
            
            <div className="mt-6">
              <label className="label">Upload Your Resume</label>
              <div
                {...getRootProps()}
                className={`mt-1 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition hover:border-primary/70 hover:bg-primary/5 ${
                  resumeFile ? 'border-primary/70 bg-primary/5' : ''
                }`}
              >
                <input {...getInputProps()} />
                <FileText className="mb-2 h-8 w-8 text-gray-400" />
                {resumeFile ? (
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">{resumeFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(resumeFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      Drag and drop your resume here, or click to select a file
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports PDF, DOC, DOCX
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <TextArea
                label="Or Paste Your Resume Text"
                id="resumeText"
                placeholder="Paste the content of your resume here..."
                rows={8}
                error={errors.resumeText?.message}
                {...register('resumeText', {
                  validate: value => {
                    return (value.trim() !== '' || resumeFile !== null) || 
                      'Please either upload a resume or paste your resume text';
                  }
                })}
              />
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={!resumeText && !resumeFile}
                icon={<ArrowRight className="ml-2 h-4 w-4" />}
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </Card>
        )}

        {activeStep === 2 && (
          <Card className="animate-fadeIn">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Job Details</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Job Title"
                id="jobTitle"
                placeholder="e.g. Frontend Developer"
                error={errors.jobTitle?.message}
                {...register('jobTitle', { required: 'Job title is required' })}
              />
              
              <Input
                label="Company Name"
                id="company"
                placeholder="e.g. Acme Inc."
                error={errors.company?.message}
                {...register('company', { required: 'Company name is required' })}
              />
            </div>
            
            <div className="mt-6">
              <TextArea
                label="Job Description"
                id="jobDescription"
                placeholder="Paste the full job description here..."
                rows={10}
                error={errors.jobDescription?.message}
                {...register('jobDescription', { required: 'Job description is required' })}
              />
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={!jobDescription}
                icon={<ArrowRight className="ml-2 h-4 w-4" />}
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </Card>
        )}

        {activeStep === 3 && (
          <Card className="animate-fadeIn">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Review & Generate</h2>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-900">Your Information</h3>
                <div className="rounded-md bg-gray-50 p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Name:</strong> {watch('name')}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    <strong>Email:</strong> {watch('email')}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    <strong>Resume:</strong> {resumeFile ? resumeFile.name : 'Text input provided'}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="mb-3 text-lg font-medium text-gray-900">Job Details</h3>
                <div className="rounded-md bg-gray-50 p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Job Title:</strong> {watch('jobTitle')}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    <strong>Company:</strong> {watch('company')}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    <strong>Job Description:</strong> {watch('jobDescription').substring(0, 100)}...
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="mb-6 text-gray-600">
                Our AI will analyze your resume and the job description to create tailored documents
                that highlight your most relevant skills and experience.
              </p>
              
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Briefcase className="h-4 w-4" />
                Estimated Match Score: 85%
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
              >
                Generate Tailored Documents
              </Button>
            </div>
          </Card>
        )}
      </form>
    </div>
  );
};

export default ResumeForm;