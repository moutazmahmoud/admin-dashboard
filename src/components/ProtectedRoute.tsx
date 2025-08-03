import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const ProtectedRoute = () => {
  const { user, isAuthResolved } = useAuthStore();

  if (!isAuthResolved) return <div>Loading...</div>; // Or a spinner

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
