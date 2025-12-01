// layouts/DashboardLayout.tsx
import Topbar from "@/components/Topbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const DashboardLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  return (
    <div className="flex h-screen">
      <Sidebar isExpanded={isSidebarExpanded} />
      <div className="flex-1">
        <Topbar onToggleSidebar={() => setIsSidebarExpanded((prev) => !prev)} />
        <div
          className="h-full overflow-y-scroll bg-[#F5F6FA] p-8"
          style={{ maxHeight: "calc(100vh - 5rem)" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
