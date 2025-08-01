import { Deal } from "@/types/Deal";

import AppleWatchImage from "../assets/images/png-clipart-apple-watch-series-3-apple-watch-series-1-apple-watch-series-2-apple-electronics-apple-watch-thumbnail.png";
import SamsungTvImage from "../assets/images/pngegg.png";
import MacBookProImage from "../assets/images/png-transparent-macbook-pro-laptop-apple-laptop-electronics-computer-laptop-thumbnail.png";

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
];
