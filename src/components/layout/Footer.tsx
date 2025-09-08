import React from 'react';
import { FileText, Github as GitHub, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">MatchResume</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              AI-powered resume and cover letter tailoring tool to help you land your dream job.
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/" className="text-sm text-gray-600 hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="/app" className="text-sm text-gray-600 hover:text-primary">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/app/create" className="text-sm text-gray-600 hover:text-primary">
                  Create Resume
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-gray-900">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="flex items-center text-sm text-gray-600 hover:text-primary">
                  <GitHub className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-sm text-gray-600 hover:text-primary">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} MatchResume. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;