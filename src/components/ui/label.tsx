'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
  size?: 'sm' | 'md' | 'lg';
};

const labelVariants = cva(
  'flex items-center gap-2 text-text-default font-suite-medium leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 whitespace-nowrap',
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
function Label({ className, size, ...props }: LabelProps) {
  return <LabelPrimitive.Root data-slot="label" className={cn(labelVariants({ size }), className)} {...props} />;
}

export { Label };
