'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
};

const labelVariants = cva(
  'flex items-center gap-1 text-text-default font-suite-medium leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 whitespace-nowrap',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
function Label({ className, size, required = false, text, children, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root data-slot="label" className={cn(labelVariants({ size }), className)} {...props}>
      {text || children}
      {required && (
        <span className="mb-1">
          <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="4" rx="2" fill="#E9CBCF"></rect>
          </svg>
        </span>
      )}
    </LabelPrimitive.Root>
  );
}

export { Label };
