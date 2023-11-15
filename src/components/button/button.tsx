import React, { ComponentProps, ReactNode } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { cn } from '@/helpers';

export type Props = {
  children: ReactNode;
  color?: 'red' | 'blue' | 'gray';
  variant?: keyof typeof variants;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  props?: any;
} & ComponentProps<'button'>;

const defaultClasses =
  'flex items-center justify-center gap-2 px-4 py-2 text-md rounded';

const variants = {
  filled: {
    red: 'border border-red-400 bg-red-400 text-white hover:bg-red-500 hover:border-red-500',
    blue: 'border border-blue-400 bg-blue-400 text-white hover:bg-blue-500 hover:border-blue-500',
    gray: 'border border-gray-400 bg-gray-400 text-white hover:bg-gray-500 hover:border-gray-500',
  },
  outlined: {
    red: 'border border-red-400 bg-transparent text-red-400 hover:border-red-600 hover:text-red-600',
    blue: 'border border-blue-400 bg-transparent text-blue-400 hover:border-blue-600 hover:text-blue-600',
    gray: 'border border-gray-400 bg-transparent text-gray-400 hover:border-gray-600 hover:text-gray-600',
  },
  tinted: {
    red: 'border border-red-200 bg-red-200 text-red-500 hover:border-red-100 hover:bg-red-100',
    blue: 'border border-blue-200 bg-blue-200 text-blue-500 hover:border-blue-100 hover:bg-blue-100',
    gray: 'border border-gray-200 bg-gray-200 text-gray-500 hover:border-gray-100 hover:bg-gray-100',
  },
  plain: {
    red: 'border border-transparent bg-transparent text-red-400 hover:bg-transparent hover:text-red-500',
    blue: 'border border-transparent bg-transparent text-blue-400 hover:bg-transparent hover:text-blue-500',
    gray: 'border border-transparent bg-transparent text-gray-400 hover:bg-transparent hover:text-gray-500',
  },
};

const disabledClasses = {
  filled:
    'cursor-not-allowed border border-gray-300 bg-gray-300 text-white hover:bg-gray-300',
  outlined:
    'cursor-not-allowed border border-gray-300 bg-transparent text-gray-500',
  tinted:
    'cursor-not-allowed border border-gray-100 bg-gray-100 text-gray-500 hover:bg-gray-500',
  plain:
    'cursor-not-allowed border border-transparent bg-transparent text-gray-500 hover:bg-transparent',
};

const Spinner = () => {
  return (
    <div className='flex items-center justify-center'>
      <ImSpinner2 className='animate-spin text-2xl' />
    </div>
  );
};

export const Button = ({
  children,
  color = 'blue',
  variant = 'filled',
  disabled = false,
  loading = false,
  className,
  leftAccessory,
  rightAccessory,
  onClick,
  ...props
}: Props): JSX.Element => {
  return (
    <button
      className={cn(
        defaultClasses,
        disabled || loading
          ? disabledClasses[variant]
          : variants[variant][color],
        className
      )}
      onClick={disabled || loading ? undefined : onClick}
      {...props}
    >
      {leftAccessory && leftAccessory}
      {loading ? <Spinner /> : children}
      {rightAccessory && rightAccessory}
    </button>
  );
};

// export default Button;
