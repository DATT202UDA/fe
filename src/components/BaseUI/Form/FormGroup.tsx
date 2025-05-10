import React from 'react';

interface FormGroupProps {
  label?: string;
  children: React.ReactNode;
  error?: string;
  labelClassName?: string;
  className?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
  helperText?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  children,
  error,
  className = '',
  labelClassName = 'text-gray-700',
  labelIcon,
  required = false,
  helperText,
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 mb-4 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className={`block text-sm font-medium ${labelClassName}`}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
            {labelIcon && (
              <span className="ml-1.5 inline-flex items-center text-gray-400">
                {labelIcon}
              </span>
            )}
          </label>
          {helperText && !error && (
            <span className="text-xs text-gray-500">{helperText}</span>
          )}
        </div>
      )}

      <div className="relative">{children}</div>
      {error && (
        <div className="flex items-center text-red-500 mt-1 mb-1.5">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormGroup;
