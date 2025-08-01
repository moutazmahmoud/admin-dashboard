// layouts/DashboardLayout.tsx
import TopBar from "@/components/topbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <div
          className="overflow-y-scroll h-full p-2 bg-[#F5F6FA]"
          style={{ maxHeight: "calc(100vh - 5rem)" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
