// layouts/DashboardLayout.tsx
import Topbar from "@/components/Topbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";

interface DashboardLayoutProps {
  user: any;
}

const DashboardLayout = ({ user }: DashboardLayoutProps) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  console.log(user);

  return (
    <div className="flex h-screen">
      <Sidebar isExpanded={isSidebarExpanded} />
      <div className="flex-1">
        <Topbar
          onToggleSidebar={() => setIsSidebarExpanded((prev) => !prev)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
        />
        <div
          className="h-full overflow-y-scroll bg-[#F5F6FA] p-8"
          style={{ maxHeight: "calc(100vh - 5rem)" }}
        >
          <Outlet />
        </div>
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
