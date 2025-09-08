import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm, { AuthFormValues } from '../components/auth/AuthForm';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    try {
      await register(data.email, data.password);
      showToast('Account created successfully!', 'success');
      navigate('/app');
    } catch (error) {
      console.error('Registration error:', error);
      showToast('Failed to create account. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm 
      type="register" 
      onSubmit={handleSubmit} 
      isLoading={isLoading} 
    />
  );
};

export default Register;