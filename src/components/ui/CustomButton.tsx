type CustomButtonProps = {
  text: string;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export function CustomButton({ text, active, onClick }: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
    w-full h-10 flex items-center justify-center rounded p-1 text-sm font-suite cursor-pointer transition-colors duration-200 shadow-default
    ${active ? 'bg-pink-200 text-text-default border border-pink-500' : 'bg-white text-muted-foreground'}
  `}
    >
      {text}
    </button>
  );
}
