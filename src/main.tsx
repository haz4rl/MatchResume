import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ResumeProvider } from './contexts/ResumeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <ResumeProvider>
          <App />
        </ResumeProvider>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);
