import { Deal } from "@/types/Deal";

import AppleWatchImage1 from "@/assets/images/products/watch-1.png";
import AppleWatchImage2 from "@/assets/images/products/watch-2.png";
import AppleWatchImage3 from "@/assets/images/products/watch-3.png";
import SamsungTvImage from "@/assets/images/products/tv.png";
import MacBookProImage1 from "@/assets/images/products/mac-1.png";
import MacBookProImage2 from "@/assets/images/products/mac-2.png";
import MacBookProImage3 from "@/assets/images/products/mac-3.png";
import MouseImage1 from "@/assets/images/products/mouse-1.png";
import MouseImage2 from "@/assets/images/products/mouse-2.png";
import MouseImage3 from "@/assets/images/products/mouse-3.png";
import { Product } from "@/types/Product";

// Mock sales data
export const salesDataByMonth: Record<string, number[]> = {
  January: Array.from({ length: 31 }, () => Math.floor(Math.random() * 70000)),
  February: Array.from({ length: 28 }, () => Math.floor(Math.random() * 70000)),
  March: Array.from({ length: 31 }, () => Math.floor(Math.random() * 70000)),
  April: Array.from({ length: 30 }, () => Math.floor(Math.random() * 70000)),
};

// Mock deals data
export const mockDeals: Deal[] = [
  {
    productName: "Apple watch",
    productImageUrl: AppleWatchImage1,
    location: "Cairo, Egypt",
    dateTime: "2025-08-01 14:30",
    pieces: 10,
    amount: 14500,
    status: "Delivered",
  },
  {
    productName: "Samsung TV",
    productImageUrl: SamsungTvImage,
    location: "Giza, Egypt",
    dateTime: "2025-08-01 12:00",
    pieces: 3,
    amount: 33000,
    status: "Pending",
  },
  {
    productName: "MacBook Pro",
    productImageUrl: MacBookProImage1,
    location: "Alexandria, Egypt",
    dateTime: "2025-07-30 17:15",
    pieces: 2,
    amount: 95000,
    status: "Cancelled",
  },

  {
    productName: "Wireless Mouse",
    productImageUrl: MouseImage1,
    location: "Cairo, Egypt",
    dateTime: "2025-08-01 14:30",
    pieces: 7,
    amount: 1500,
    status: "Delivered",
  },
];

// Mock products data

export const products: Product[] = [
  {
    id: 1,
    name: "Apple Watch",
    description:
      "The Apple Watch is a smartwatch that offers a range of features, including fitness tracking, GPS navigation, and voice assistants.",
    images: [AppleWatchImage1, AppleWatchImage2, AppleWatchImage3],
    price: 499,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Samsung TV",
    description:
      "The Samsung TV is a high-end television that offers a range of features, including 4K resolution, HDR, and voice assistants.",
    images: [SamsungTvImage, SamsungTvImage, SamsungTvImage],
    price: 999,
    rating: 4,
  },
  {
    id: 3,
    name: "MacBook Pro",
    description:
      "The MacBook Pro is a powerful laptop that offers a range of features, including Retina display, Thunderbolt, and Apple Pencil.",
    images: [MacBookProImage1, MacBookProImage2, MacBookProImage3],
    price: 1999,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Wireless Mouse",
    description:
      "The Wireless Mouse is a portable mouse that offers a range of features, including Bluetooth connectivity, customizable buttons, and customizable settings.",
    images: [MouseImage1, MouseImage2, MouseImage3],
    price: 799,
    rating: 3.5,
  },
];
