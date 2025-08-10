// layouts/DashboardLayout.tsx
import Topbar from "@/components/Topbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
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
