import { ReactNode } from 'react';

type CustomButtonProps = {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  type: string; // 'input' | 'box'
};

export function CustomBox({ children, onClick, className, type }: CustomButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`
    w-full ${
      type === 'input' ? 'h-12' : 'h-auto'
    } flex items-center justify-center rounded-md px-3 py-2 text-sm font-suite cursor-pointer transition-colors duration-200 shadow-default bg-white text-muted-foreground ${className}`}
    >
      {children}
    </div>
  );
}
