import * as React from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const inputVariants = cva(
  'shadow-default text-text-default font-suite file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded border bg-transparent py-1 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'h-8 text-sm px-3 py-1.5',
        md: 'h-10 text-sm px-3 py-2',
        lg: 'h-10 text-base px-3 py-2.5',
      },
      hasAdornment: {
        true: 'pr-10', // Adjust padding as needed for icon size
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

type InputProps = React.ComponentProps<'input'> & {
  width?: string;
  size?: 'sm' | 'md' | 'lg' | any;
  placeholderClassName?: string;
};

function Input({ className, width = '', size = 'md', placeholderClassName = '', type, value, defaultValue, ...props }: InputProps) {
  const isControlled = value !== undefined;
  const [showPassword, setShowPassword] = React.useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const isPasswordField = type === 'password';
  return (
    <div className={cn('relative', width)}>
      <input
        type={inputType}
        data-slot="input"
        className={cn(inputVariants({ size, hasAdornment: isPasswordField }), placeholderClassName && `placeholder:${placeholderClassName}`, className)}
        {...props}
        {...(isControlled ? { value } : { defaultValue })}
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 pb-[6px] text-muted-foreground cursor-pointer"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}

export { Input, inputVariants };
