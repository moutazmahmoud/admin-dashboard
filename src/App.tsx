import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Home,
  NoMatch,
  Products,
  Favorites,
  OrderLists,
  Register,
  Login,
  ForgotPassword,
  ProductsStock,
} from "./pages";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";

const App: FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="order-lists" element={<OrderLists />} />
            <Route path="product-stock" element={<ProductsStock />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
