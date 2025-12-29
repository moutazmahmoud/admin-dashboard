// components/Sidebar.tsx
import { useLocation } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import { navItems } from "../lib/navItems";
import NavItem from "./NavItem";
import { useAuthStore } from "@/store/useAuthStore";
import LogoutIcon from "@/assets/icons/turn-off.svg?react";
import { useModalStore } from "@/store/useModalStore";
import LogoShort from "@/assets/images/logoshort.png";
import LogoLabel from "@/assets/images/logoLabel.png";

const ITEM_HEIGHT = 48;

interface SidebarProps {
  isExpanded: boolean;
}

const Sidebar = ({ isExpanded }: SidebarProps) => {
  const { logout } = useAuthStore((state) => state);
  const openModal = useModalStore((state) => state.openModal);

  const handleLogout = () => {
    openModal({
      type: "logout",
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      confirmText: "Logout",
      onConfirm: () => {
        console.log("User logged out");
        logout();
      },
    });
  };

  const { pathname } = useLocation();

  const activeIndex = navItems.findIndex((item) => item.to === pathname);
  const showIndicator = activeIndex !== -1;

  return (
    <motion.div
      // animate={{ maxWidth: isExpanded ? 240 : 96 }}
      transition={{ duration: 5, ease: "easeInOut" }}
      className="bg-main relative flex h-screen flex-col p-6"
    >
      <h2 className="mb-7 flex items-center text-lg font-extrabold">
        <motion.img
          src={LogoShort}
          alt="logo"
          className="h-10"
          animate={{
            x: isExpanded ? 0 : 4,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          
        />
        <motion.img
          src={LogoLabel}
          animate={{
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "123px" : 0,
            // minWidth: isExpanded ? "123px" : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-10 overflow-hidden"
          alt="Dashboard"
        />
      </h2>

      <ul className="relative z-10">
        {/* Background highlight */}
        {showIndicator && (
          <motion.div
            className="absolute -left-[1.78125rem] right-0 top-0 z-0 h-[50px] w-[0.5625rem] rounded-[0.25rem] bg-primary"
            style={{ top: activeIndex * ITEM_HEIGHT }}
            layout
            layoutId="nav-active-indicator"
            transition={{
              duration: 0.3,
              ease: easeInOut,
            }}
          />
        )}
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} isExpanded={isExpanded} />
        ))}
        <div className="my-4 h-[1px] w-full bg-[#E8E8E8]"></div>
        <NavItem
          onClick={handleLogout}
          label="Logout"
          Icon={LogoutIcon}
          isExpanded={isExpanded}
        />
      </ul>
    </motion.div>
  );
};

export default Sidebar;
