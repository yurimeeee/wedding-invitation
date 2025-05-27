'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { CircleIcon } from 'lucide-react';
import { Label } from './label';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-3', className)} {...props} />;
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="relative flex items-center justify-center">
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };

type CustomRadioGroupProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string | boolean;
  }[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function CustomRadioGroup({ label, value, onChange, options, className = '', size = 'md' }: CustomRadioGroupProps) {
  return (
    <div className={className}>
      {label && <p className="text-sm text-text-default font-suite-medium whitespace-nowrap">{label}</p>}
      <RadioGroup value={value} onValueChange={onChange} className={`flex items-center gap-4 ${className}`}>
        {options.map((option, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <RadioGroupItem value={String(option.value)} id={`${label}-${option.label}-${option.value}`} />
            <Label htmlFor={`${option.label}-${option.value}`} size={size}>
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
