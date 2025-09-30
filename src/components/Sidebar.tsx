// components/Sidebar.tsx
import { useLocation } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import { navItems } from "../lib/navItems";
import NavItem from "./NavItem";
import { useAuthStore } from "@/store/useAuthStore";
import LogoutIcon from "@/assets/icons/turn-off.svg?react";
import { useModalStore } from "@/store/useModalStore";
import Logo from "@/assets/images/logo.png";

const ITEM_HEIGHT = 50;

const Sidebar = () => {
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
    <div className="bg-main relative h-screen w-[15rem] min-w-[15rem] p-6 text-center">
      <h2 className="mb-[1.875rem] text-[1.25rem] font-extrabold">
        <img src={Logo} alt="logo" className="w-full" />
        {/* <span className="text-primary">Dash</span>Stack */}
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
          <NavItem key={item.to} {...item} />
        ))}
        <div className="my-4 h-[1px] w-full bg-[#E8E8E8]"></div>
        <NavItem onClick={handleLogout} label="Logout" Icon={LogoutIcon} />
      </ul>
    </div>
  );
};

export default Sidebar;
