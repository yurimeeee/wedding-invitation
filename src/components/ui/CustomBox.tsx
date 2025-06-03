import { ReactNode } from 'react';

type CustomButtonProps = {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
};

export function CustomBox({ children, onClick, className }: CustomButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`
    w-full h-12 flex items-center justify-center rounded-md px-3 py-2 text-sm font-suite cursor-pointer transition-colors duration-200 shadow-default bg-white text-muted-foreground ${className}`}
    >
      {children}
    </div>
  );
}
