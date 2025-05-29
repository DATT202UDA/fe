'use client';

import { forwardRef } from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-[#7A5C3E]">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full px-4 py-2 rounded-lg border ${
            error ? 'border-red-500' : 'border-[#E5E3DF]'
          } focus:outline-none focus:ring-2 focus:ring-[#E6A15A] focus:border-transparent ${
            error ? 'focus:ring-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
