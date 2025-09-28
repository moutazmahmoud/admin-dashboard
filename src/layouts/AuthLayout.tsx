// layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import AuthBackground from "@/assets/images/Shape.png";

const AuthLayout = () => {
  return (
    <div className="relative flex h-screen w-full bg-[#4880FF]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${AuthBackground})`,
        }}
      ></div>
      <div className="relative flex w-full items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
