import React from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  XCircle, 
  X
} from 'lucide-react';

type ToastProps = {
  type: 'success' | 'error' | 'warning' | 'info';
  message: React.ReactNode;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-error" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'info':
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/20';
      case 'error':
        return 'bg-error/10 border-error/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'info':
        return 'bg-primary/10 border-primary/20';
    }
  };

  return (
    <div 
      className={`animate-slideUp flex items-center gap-3 rounded-lg border p-4 shadow-md ${getBgColor()}`}
      role="alert"
    >
      {getIcon()}
      <p className="text-sm" dangerouslySetInnerHTML={{ __html:message}}></p>
      <button 
        onClick={onClose}
        className="ml-auto text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;