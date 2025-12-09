import PageWrapper from "@/components/PageWrapper";
import ProductCard from "@/pages/Products/ui/components/ProductCard";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { FC } from "react";
import { Heart } from "lucide-react";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

const Favorites: FC = () => {
  const favorites = useFavoritesStore((s) => s.favorites);

  const isEmpty = favorites.length === 0;
    const navigate = useNavigate();


  return (
    <PageWrapper>
      <section>
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-lg shadow-md">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <Heart className="h-10 w-10 text-red-500" />
            </div>

            <h2 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-gray-200">
              No favorites yet
            </h2>

            <p className="mb-6 max-w-md text-gray-500 dark:text-gray-400">
              Browse products and click the heart icon to save items you like.
              They will appear here for quick access anytime.
            </p>

            <Button variant="primary" className="" onClick={() => {navigate('/products')}}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
};

export default Favorites;
