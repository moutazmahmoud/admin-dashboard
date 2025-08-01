export type Deal = {
  productName: string;
  productImageUrl: string;
  location: string;
  dateTime: string;
  pieces: number;
  amount: number;
  status: "Pending" | "Delivered" | "Cancelled";
};
