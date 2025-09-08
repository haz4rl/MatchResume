import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

type AuthFormProps = {
  type: 'login' | 'register';
  onSubmit: (data: AuthFormValues) => void;
  isLoading: boolean;
};

export type AuthFormValues = {
  email: string;
  password: string;
  name?: string;
};

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormValues>();

  return (
    <Card className="w-full max-w-md">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
        {type === 'login' ? 'Sign in to your account' : 'Create a new account'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {type === 'register' && (
          <Input
            label="Full Name"
            id="name"
            type="text"
            icon={<User className="h-5 w-5" />}
            placeholder="Enter your name"
            error={errors.name?.message}
            {...register('name', {
              required: 'Name is required',
            })}
          />
        )}

        <Input
          label="Email"
          id="email"
          type="email"
          icon={<Mail className="h-5 w-5" />}
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          icon={<Lock className="h-5 w-5" />}
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          {type === 'login' ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <Link to="/register\" className="font-medium text-primary hover:text-primary-dark">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
              Sign in
            </Link>
          </>
        )}
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          fullWidth
          onClick={() => window.location.href = '/app'}
        >
          Try Demo Mode
        </Button>
      </div>
    </Card>
  );
};

export default AuthForm;