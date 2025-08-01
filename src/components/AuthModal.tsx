import React from "react";

type AuthModalProps = {
  title?: string;
  description?: string;
  buttonText: string;
  onClick: () => void;
  children: React.ReactNode;
};

const AuthModal = ({
  children,
  title,
  description,
  buttonText,
  onClick,
}: AuthModalProps) => {
  return (
    <div className="min-w-[39.375rem] rounded-3xl bg-white p-3">
      {title && (
        <h3 className="text-center text-[2rem] font-bold text-text">{title}</h3>
      )}
      {description && (
        <p className="mt-1 text-center text-[1.125rem] font-semibold text-text/80">
          {description}
        </p>
      )}
      {children}

      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
};

export default AuthModal;
