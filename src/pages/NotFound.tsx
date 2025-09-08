import React from 'react';
import { Link } from 'react-router-dom';
import { FileSearch } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center px-4 py-16 text-center">
      <FileSearch className="h-20 w-20 text-gray-400" />
      <h1 className="mt-6 text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-3 text-lg text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button variant="primary">
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;