type CustomButtonProps = {
  text: string;
  active?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
};

export function CustomButton({ text, active, onClick, disabled, className }: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
    w-full h-12 flex items-center justify-center rounded-md p-1 text-sm font-suite ${
      !disabled ? 'cursor-pointer' : 'cursor-not-allowed'
    } transition-colors duration-200 shadow-default
    ${active ? 'bg-pink-200 text-text-default border border-pink-500' : 'bg-white text-muted-foreground'}
    ${className}
  `}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
