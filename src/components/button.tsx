type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  classes?: string;
};

export default function Button({ children, onClick, classes }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-0.5 bg-primary px-4 py-1 text-white ${classes}`}
    >
      {children}
    </button>
  );
}
