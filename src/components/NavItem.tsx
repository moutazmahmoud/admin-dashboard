// components/NavItem.tsx
import { Link, useLocation } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import React from "react";

interface NavItemProps {
  to?: string;
  onClick?: () => void;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const NavItem = ({ to, onClick, label, Icon }: NavItemProps) => {
  const { pathname } = useLocation();
  const isActive = to ? pathname === to : false;

  const commonClasses = `relative z-10 flex items-center gap-4 px-4 py-[0.8125rem] text-[0.875rem] font-semibold transition-colors duration-200 ease-in-out ${
    isActive ? "fill-white text-white" : "fill-text text-text"
  }`;

  return (
    <li className="relative overflow-hidden rounded-[0.75rem]">
      {isActive && (
        <motion.div
          layoutId="nav-active-bg"
          className="absolute inset-0 z-0 rounded-[0.75rem] bg-primary"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: easeInOut }}
        />
      )}

      {to ? (
        <Link to={to} className={commonClasses}>
          <Icon className="h-6 w-6" />
          {label}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={`${commonClasses} w-full text-left`}
        >
          <Icon className="h-6 w-6" />
          {label}
        </button>
      )}
    </li>
  );
};

export default NavItem;
