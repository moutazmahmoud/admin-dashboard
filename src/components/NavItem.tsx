// components/NavItem.tsx
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import React, { useState } from "react";
import { cubicBezier } from "framer-motion";

interface NavItemProps {
  to?: string;
  onClick?: () => void;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  isExpanded: boolean;
}

const NavItem = ({ to, onClick, label, Icon, isExpanded }: NavItemProps) => {
  const { pathname } = useLocation();
  const isActive = to ? pathname === to : false;
  const [hovered, setHovered] = useState(false);

  const commonClasses = `relative z-10 flex items-center p-3 text-[0.875rem] font-semibold transition-colors duration-200 ease-in-out ${
    isActive ? "fill-white text-white" : "fill-text text-text"
  }`;

  const easePunch = cubicBezier(0.25, 1.4, 1, 1);

  // LABEL when expanded
  const textLabel = (
    <AnimatePresence mode="popLayout">
      <motion.span
        initial={false}
        animate={{
          opacity: isExpanded ? 1 : 0,
          width: isExpanded ? "123px" : "0px",
          paddingLeft: isExpanded ? "16px" : "0px",
        }}
        transition={{ duration: 0.7, ease: easePunch }}
        className="overflow-hidden whitespace-nowrap"
      >
        {label}
      </motion.span>
    </AnimatePresence>
  );

  const tooltip = (
    <AnimatePresence>
      {!isExpanded && hovered && (
        <motion.div
          key="tooltip"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 24, y: "-50%" }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.25, ease: "easeOut", delay: 0.3 }}
          className="
          pointer-events-none absolute left-full 
          top-1/2 -translate-y-1/2
          whitespace-nowrap rounded-md bg-black/70 px-3
          py-1 text-sm text-white shadow-lg
        "
        >
          {label}
        </motion.div>
      )}
    </AnimatePresence>
  );

  // **Choose element safely**
  let NavElement: JSX.Element;

  if (to) {
    NavElement = (
      <Link to={to} className={commonClasses}>
        <Icon className="h-6 w-6" />
        {textLabel}
      </Link>
    );
  } else {
    NavElement = (
      <button onClick={onClick} className={`${commonClasses} w-full text-left`}>
        <Icon className="h-6 w-6" />
        {textLabel}
      </button>
    );
  }

  return (
    <li
      className="relative overflow-visible rounded-[0.75rem]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Active BG */}
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

      {/* Tooltip */}
      {tooltip}

      {/* Main element */}
      {NavElement}
    </li>
  );
};

export default NavItem;
