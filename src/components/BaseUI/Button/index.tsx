import { Button as ButtonBase } from '@headlessui/react';
import { ButtonHTMLAttributes } from 'react';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  variant?: 'outlined' | 'contained' | 'text';
  size?: 's' | 'm' | 'l';
  theme?:
    | 'primary'
    | 'secondary'
    | 'neutral'
    | 'success'
    | 'warning'
    | 'danger';
  disabled?: boolean;
  className?: string;
  circle?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<BaseButtonProps> = ({
  onClick,
  children,
  theme = 'primary',
  variant = 'contained',
  size = 'm',
  disabled = false,
  className = '',
  circle = false,
  loading = false,
  fullWidth = false,
  ...rest
}) => {
  // Base classes with smooth transitions
  const baseClasses = `${
    circle ? 'rounded-full' : 'rounded-lg'
  } flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-pre transition-all duration-200 ${
    fullWidth ? 'w-full' : ''
  }`;

  // Size classes
  const sizeClasses = {
    s: 'px-3 py-1.5 text-sm min-w-[100px]',
    m: 'px-4 py-2 text-base min-w-[120px]',
    l: 'px-6 py-3 text-lg min-w-[140px]',
  };

  const containedColorClasses = {
    primary:
      'bg-[#E6A15A] text-white border border-transparent shadow-sm hover:shadow-md',
    secondary:
      'bg-[#F8F6F3] text-[#7A5C3E] border border-[#E5E3DF] shadow-sm hover:shadow-md',
    neutral:
      'bg-white text-[#7A5C3E] border border-[#E5E3DF] shadow-sm hover:shadow-md',
    success:
      'bg-[#4CAF50] text-white border border-transparent shadow-sm hover:shadow-md',
    warning:
      'bg-[#FFA726] text-white border border-transparent shadow-sm hover:shadow-md',
    danger:
      'bg-[#EF5350] text-white border border-transparent shadow-sm hover:shadow-md',
  };

  const containedHoverClasses = {
    primary: 'hover:bg-[#D68F4A] active:bg-[#C97A3A]',
    secondary: 'hover:bg-[#F3F0EB] active:bg-[#ECE9E6]',
    neutral: 'hover:bg-[#FAF9F7] active:bg-[#F8F6F3]',
    success: 'hover:bg-[#43A047] active:bg-[#388E3C]',
    warning: 'hover:bg-[#FB8C00] active:bg-[#F57C00]',
    danger: 'hover:bg-[#E53935] active:bg-[#D32F2F]',
  };

  const outlinedColorClasses = {
    primary: 'bg-transparent border-2 border-[#E6A15A] text-[#E6A15A]',
    secondary: 'bg-transparent border-2 border-[#E5E3DF] text-[#7A5C3E]',
    neutral: 'bg-transparent border-2 border-[#E5E3DF] text-[#7A5C3E]',
    success: 'bg-transparent border-2 border-[#4CAF50] text-[#4CAF50]',
    warning: 'bg-transparent border-2 border-[#FFA726] text-[#FFA726]',
    danger: 'bg-transparent border-2 border-[#EF5350] text-[#EF5350]',
  };

  const outlinedHoverClasses = {
    primary: 'hover:bg-[#FFF5EB] active:bg-[#FFE8D6]',
    secondary: 'hover:bg-[#F8F6F3] active:bg-[#F3F0EB]',
    neutral: 'hover:bg-[#F8F6F3] active:bg-[#F3F0EB]',
    success: 'hover:bg-[#E8F5E9] active:bg-[#C8E6C9]',
    warning: 'hover:bg-[#FFF3E0] active:bg-[#FFE0B2]',
    danger: 'hover:bg-[#FFEBEE] active:bg-[#FFCDD2]',
  };

  const textColorClasses = {
    primary: 'text-[#E6A15A] hover:bg-[#FFF5EB]',
    secondary: 'text-[#7A5C3E] hover:bg-[#F8F6F3]',
    neutral: 'text-[#7A5C3E] hover:bg-[#F8F6F3]',
    success: 'text-[#4CAF50] hover:bg-[#E8F5E9]',
    warning: 'text-[#FFA726] hover:bg-[#FFF3E0]',
    danger: 'text-[#EF5350] hover:bg-[#FFEBEE]',
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'contained':
        return {
          default: containedColorClasses[theme],
          hover: containedHoverClasses[theme],
        };
      case 'outlined':
        return {
          default: outlinedColorClasses[theme],
          hover: outlinedHoverClasses[theme],
        };
      case 'text':
        return {
          default: textColorClasses[theme],
          hover: '',
        };
      default:
        return {
          default: containedColorClasses[theme],
          hover: containedHoverClasses[theme],
        };
    }
  };

  const { default: defaultVariantClasses, hover: hoverVariantClasses } =
    getVariantClasses();
  const finalDisabled = disabled || loading;

  const classes = `${className} ${baseClasses} ${defaultVariantClasses} ${
    !finalDisabled ? hoverVariantClasses : ''
  } ${sizeClasses[size]} ${
    finalDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
  }`;

  return (
    <ButtonBase
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={classes}
      disabled={finalDisabled}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </span>
      ) : (
        children
      )}
    </ButtonBase>
  );
};

export default Button;
