import { Input as InputBase } from '@headlessui/react';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register?: any;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'search';
  placeholder?: string;
  error?: string;
  min?: number;
  max?: number;
  variant?: 'primary' | 'secondary' | 'outlined';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      register,
      type = 'text',
      placeholder,
      error,
      variant = 'primary',
      min,
      max,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const baseClasses = `
      px-4 py-2.5 rounded-lg border transition-all duration-200 ease-in-out
      text-[#7A5C3E] placeholder-[#B0A99F] text-sm
      focus:outline-none focus:ring-2 focus:ring-offset-1
      disabled:bg-[#F3F0EB] disabled:cursor-not-allowed
      bg-[#FAF9F7]
      ${fullWidth ? 'w-full' : ''}
    `;

    const variantClasses = {
      primary: `
        border-[#E5E3DF]
        hover:border-[#E6A15A]
        focus:border-[#E6A15A] focus:ring-[#E6A15A] focus:ring-opacity-30
        ${
          error
            ? 'border-[#EF5350] focus:border-[#EF5350] focus:ring-[#EF5350]/20'
            : ''
        }
      `,
      secondary: `
        border-[#E5E3DF] bg-[#F8F6F3]
        hover:border-[#E6A15A]
        focus:border-[#E6A15A] focus:ring-[#E6A15A] focus:ring-opacity-30
        ${
          error
            ? 'border-[#EF5350] focus:border-[#EF5350] focus:ring-[#EF5350]/20'
            : ''
        }
      `,
      outlined: `
        border-2 border-[#E5E3DF] bg-transparent
        hover:border-[#E6A15A]
        focus:border-[#E6A15A] focus:ring-[#E6A15A] focus:ring-opacity-30
        ${
          error
            ? 'border-[#EF5350] focus:border-[#EF5350] focus:ring-[#EF5350]/20'
            : ''
        }
      `,
    };

    const inputClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-[#B0A99F]">{leftIcon}</span>
          </div>
        )}
        <InputBase
          ref={ref}
          className={`
            ${inputClasses}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
          `}
          type={type}
          placeholder={placeholder}
          min={min}
          max={max}
          aria-invalid={!!error}
          {...(register ? register(name) : {})}
          {...rest}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="text-[#B0A99F]">{rightIcon}</span>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
