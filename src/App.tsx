import { FC, useEffect, useState } from "react";
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
import GlobalModal from "./components/GlobalModal";
import { useAuthStore } from "./store/useAuthStore";
import SplashLoader from "./components/SplashLoader";
import Todos from "./pages/Todos";
import Analytics from "./pages/Analytics/ui/Page/Page";
import { ProductDetails } from "./pages/ProductDetails";

const App: FC = () => {
  const { isAuthResolved, initAuthListener } = useAuthStore();
  const [showLoader, setShowLoader] = useState(true);
  const location = useLocation();

  // Initialize auth state once
  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  // When auth is resolved, hide splash after min duration
  useEffect(() => {
    if (isAuthResolved) {
      setShowLoader(false);
    }
  }, [isAuthResolved]);

  return (
    <>
      {showLoader && (
        <AnimatePresence mode="wait">
          <SplashLoader
            open={showLoader}
            minDuration={1000}
            onFinish={() => setShowLoader(false)}
          />
        </AnimatePresence>
      )}

      {/* Only render routes when splash loader is gone */}
      {!showLoader && (
        <>
          <AnimatePresence mode="wait">
            <Routes location={location}>
              {/* Protected dashboard */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<DashboardLayout />}>
                  <Route index element={<Home />} />
                  <Route path="products" element={<Products />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="order-lists" element={<OrderLists />} />
                  <Route path="product-stock" element={<ProductsStock />} />
                  <Route path="todos" element={<Todos />} />
                  <Route path="*" element={<NoMatch />} />
                </Route>
              </Route>

              {/* Auth routes */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>
          </AnimatePresence>

          <GlobalModal />
        </>
      )}
    </>
  );
};

export default App;
