import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    text?: string;
    width?: string;
    size?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
  };

const buttonVariants = cva(
  '!text-suite-bold cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-medium transition-all disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pointer-cursor',
  {
    variants: {
      variant: {
        default: 'bg-text-default text-white hover:bg-primary/90',
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

function Button({ className, variant = 'default', width = '', size = 'md', asChild = false, text, leftIcon, rightIcon, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp className={cn(buttonVariants({ variant, size }), width, className)} {...props}>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {text && <span>{text}</span>}
      {children && children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </Comp>
  );
}

export { Button, buttonVariants };
