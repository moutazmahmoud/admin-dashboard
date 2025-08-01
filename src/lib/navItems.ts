// navItems.ts
import DashboardIcon from "../assets/icons/dashboard.svg?react";
import ProductsIcon from "../assets/icons/products.svg?react";
import FavoritesIcon from "../assets/icons/favorites.svg?react";
import ProductStockIcon from "../assets/icons/product-stock.svg?react";
import OrderListsIcon from "../assets/icons/order-list.svg?react";

export const navItems = [
  { to: "/", label: "Dashboard", Icon: DashboardIcon },
  { to: "/products", label: "Products", Icon: ProductsIcon },
  { to: "/favorites", label: "Favorites", Icon: FavoritesIcon },
  { to: "/order-lists", label: "Order Lists", Icon: OrderListsIcon },
  { to: "/product-stock", label: "Product Stock", Icon: ProductStockIcon },
];
