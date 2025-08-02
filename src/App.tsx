import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Home, NoMatch } from "@/pages";
import DashboardLayout from "./layouts/DashboardLayout";
import { Products } from "./pages/Products";
import { Favorites } from "./pages/Favorites";
import { OrderLists } from "./pages/Order Lists";
import { Register } from "./pages/Register";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="order-lists" element={<OrderLists />} />
        <Route path="product-stock" element={<Products />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
};

export default App;
