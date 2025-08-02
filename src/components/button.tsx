type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  classes?: string;
};

export default function Button({
  children,
  onClick,
  classes,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-0.5 bg-primary px-1.5 py-1 text-[1.25rem] font-bold text-white ${
        disabled ? "bg-[#b2c3e9]" : ""
      }  ${classes}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
