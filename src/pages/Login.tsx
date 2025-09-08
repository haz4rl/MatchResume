import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm, { AuthFormValues } from '../components/auth/AuthForm';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/app');
    } catch (error) {
      console.error('Login error:', error);
      showToast('Invalid email or password. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm 
      type="login" 
      onSubmit={handleSubmit} 
      isLoading={isLoading} 
    />
  );
};

export default Login;