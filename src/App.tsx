import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Home, NoMatch } from "@/pages";
import DashboardLayout from "./layouts/DashboardLayout";
import { Products } from "./pages/Products";
import { Favorites } from "./pages/Favorites";
import { OrderLists } from "./pages/Order Lists";
import { Register } from "./pages/Register";
import AuthLayout from "./layouts/AuthLayout";

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
        <Route index element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
