import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-input text-foreground hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 text-sm px-3 py-1.5',
        md: 'h-10 text-sm px-4 py-2',
        lg: 'h-12 text-base px-6 py-2.5',
        icon: 'size-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    text?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

function Button({ className, variant = 'default', size = 'md', asChild = false, text, leftIcon, rightIcon, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {text && <span>{text}</span>}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </Comp>
  );
}

export { Button, buttonVariants };
