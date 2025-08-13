export type Product = {
  id: ProductId;
  name: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
  reviewsCount: number;
};

export type ProductId = number;
