import React, { forwardRef } from 'react';

type InputProps = {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = true, icon, className = '', ...props }, ref) => {
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label htmlFor={props.id} className="label">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`input ${icon ? 'pl-10' : ''} ${
              error ? 'border-error focus:border-error focus:ring-error' : ''
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;