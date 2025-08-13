import PageWrapper from "@/components/PageWrapper";
import { mockProducts } from "@/lib/MockData";
import ProductCard from "@/pages/Products/ui/Page/components/ProductCard";
import { ProductId } from "@/types/Product";
import { FC } from "react";

const MockUserFavorites: ProductId[] = [2, 5, 6, 8];

const Favorites: FC = () => {
  const userFavorites = mockProducts.filter((product) => {
    return MockUserFavorites.includes(product.id);
  });
  return (
    <PageWrapper>
      <section>
        <div className="">
          <div className="mt-8 grid grid-cols-4 gap-8">
            {userFavorites.map((product) => {
              return ProductCard(product);
            })}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Favorites;
