import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  className?: string; // changed from "classes" to match common React naming
  type?: "button" | "submit" | "reset";
};
type Variant = "primary" | "secondary" | "danger";

const variantStyles: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-[#E2EAF8] text-text hover:bg-gray-300",
  danger: "bg-red-500 text-white hover:bg-red-600",
};
export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "rounded-xl px-8 py-4 text-sm font-bold transition-colors duration-200",
        variantStyles[variant],
        disabled && "cursor-not-allowed opacity-50 hover:bg-inherit",
        className,
      )}
    >
      {children}
    </button>
  );
}
