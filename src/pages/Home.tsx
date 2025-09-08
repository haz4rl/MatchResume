import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Send, Download, BarChart3 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                Get More Interviews with <span className="text-primary">AI-Powered</span> Resume Tailoring
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                Automatically tailor your resume and cover letter to match job descriptions and stand out to recruiters and ATS systems.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/register">
                  <Button variant="primary" size="lg">
                    Get Started — It's Free
                  </Button>
                </Link>
                <Link to="/app">
                  <Button variant="outline" size="lg">
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <img 
                src="https://images.pexels.com/photos/4458419/pexels-photo-4458419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Resume tailoring" 
                className="mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
              MatchResume uses advanced AI to optimize your resume and generate personalized cover letters that match the job you want.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="text-center" hoverEffect>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Upload Your Resume</h3>
              <p className="mt-2 text-gray-600">
                Upload your existing resume or create a new one with our easy-to-use builder.
              </p>
            </Card>

            <Card className="text-center" hoverEffect>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
                <Send className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Paste Job Description</h3>
              <p className="mt-2 text-gray-600">
                Paste the job description you're applying for to help our AI understand the requirements.
              </p>
            </Card>

            <Card className="text-center" hoverEffect>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <Download className="h-7 w-7 text-accent" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Get Tailored Documents</h3>
              <p className="mt-2 text-gray-600">
                Instantly receive a tailored resume and cover letter optimized for the specific job.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Why Use MatchResume?</h2>
              <ul className="mt-8 space-y-6">
                <li className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Bypass ATS Filters</h3>
                    <p className="mt-1 text-gray-600">
                      Our AI ensures your resume contains the right keywords to get past Applicant Tracking Systems.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Save Hours of Time</h3>
                    <p className="mt-1 text-gray-600">
                      Generate tailored documents in seconds instead of spending hours rewriting for each application.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Increase Interview Chances</h3>
                    <p className="mt-1 text-gray-600">
                      Stand out with professionally tailored content that highlights your most relevant skills and experience.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Job interview success" 
                className="mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to Land Your Dream Job?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            Join thousands of job seekers who are getting more interviews with MatchResume.
          </p>
          <div className="mt-8">
            <Link to="/register">
              <Button 
                variant="accent" 
                size="lg"
                className="px-8"
              >
                Get Started For Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;