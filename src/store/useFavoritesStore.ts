import { create } from "zustand";
import type { Product } from "../types/Product";

type FavoritesState = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  toggleFavorite: (product) => {
    const { favorites } = get();
    const exists = favorites.some((p) => p.id === product.id);

    if (exists) {
      set({ favorites: favorites.filter((p) => p.id !== product.id) });
    } else {
      set({ favorites: [...favorites, product] });
    }
  },

  isFavorite: (id) => {
    return get().favorites.some((p) => p.id === id);
  },
}));
