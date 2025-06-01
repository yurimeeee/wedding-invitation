'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { CheckIcon } from 'lucide-react';
import { Label } from './label';
import { cn } from '@/lib/utils';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer font-suite text-sm text-text-default border-input dark:bg-input/30 data-[state=checked]:bg-pink-500 data-[state=checked]:text-test-default dark:data-[state=checked]:bg-primary data-[state=checked]:border-pink-500 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-default transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current transition-none">
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

type CustomCheckboxProps = {
  text?: string;
  value?: CheckboxPrimitive.CheckedState;
  onChange: (checked: CheckboxPrimitive.CheckedState) => void;
};

export function CustomCheckbox({ text, value, onChange }: CustomCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" checked={value} onCheckedChange={onChange} />
      <Label htmlFor="terms">{text}</Label>
    </div>
  );
}
