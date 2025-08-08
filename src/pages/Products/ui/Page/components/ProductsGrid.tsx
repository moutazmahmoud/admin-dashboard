import { products } from "@/lib/MockData";
import ProductCard from "./ProductCard";

const ProductsGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-8 mt-8">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
