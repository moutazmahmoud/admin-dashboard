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

  const commonClasses = `relative z-10 flex items-center gap-1 px-1 py-[0.8125rem] text-[0.875rem] font-semibold transition-colors duration-200 ease-in-out ${
    isActive ? "fill-white text-white" : "fill-text text-text"
  }`;

  return (
    <li className="relative overflow-hidden rounded-0.75">
      {isActive && (
        <motion.div
          layoutId="nav-active-bg"
          className="absolute inset-0 z-0 rounded-0.75 bg-primary"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: easeInOut }}
        />
      )}

      {to ? (
        <Link to={to} className={commonClasses}>
          <Icon className="h-1.5 w-1.5" />
          {label}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={`${commonClasses} w-full text-left`}
        >
          <Icon className="h-1.5 w-1.5" />
          {label}
        </button>
      )}
    </li>
  );
};

export default NavItem;
