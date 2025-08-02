import React from "react";
import Button from "./Button";

type AuthModalProps = {
  title?: string;
  description?: string;
  buttonText: string;
  onClick: () => void;
  children: React.ReactNode;
  bottomChildren?: React.ReactNode;
  buttonDisabled?: boolean;
};

const AuthModal = ({
  children,
  title,
  description,
  buttonText,
  onClick,
  bottomChildren,
  buttonDisabled,
}: AuthModalProps) => {
  return (
    <div className="min-w-[39.375rem] rounded-3xl bg-white px-2 py-3">
      {title && (
        <h3 className="text-center text-[2rem] font-bold text-text">{title}</h3>
      )}
      {description && (
        <p className="mt-1 text-center text-[1.125rem] font-semibold text-text/80 mb-2.5">
          {description}
        </p>
      )}
      {children}

      <div className="mt-1 px-2">
        <Button onClick={onClick} classes="w-full" disabled={buttonDisabled}>
          {buttonText}
        </Button>
      </div>
      {bottomChildren}
    </div>
  );
};

export default AuthModal;
