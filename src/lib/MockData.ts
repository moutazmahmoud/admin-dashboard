import { Deal } from "@/types/Deal";

import AppleWatchImage from "@/assets/images/products/watch-1.png";
import SamsungTvImage from "@/assets/images/products/tv.png";
import MacBookProImage from "@/assets/images/products/mac-1.png";
import MouseImage from "@/assets/images/products/mouse-1.png";

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
    productImageUrl: AppleWatchImage,
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
    productImageUrl: MacBookProImage,
    location: "Alexandria, Egypt",
    dateTime: "2025-07-30 17:15",
    pieces: 2,
    amount: 95000,
    status: "Cancelled",
  },

  {
    productName: "Wireless Mouse",
    productImageUrl: MouseImage,
    location: "Cairo, Egypt",
    dateTime: "2025-08-01 14:30",
    pieces: 7,
    amount: 1500,
    status: "Delivered",
  },
];
