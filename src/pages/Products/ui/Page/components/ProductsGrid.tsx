import { products } from "@/lib/MockData";
import ProductCard from "./ProductCard";

const ProductsGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-1 mt-2">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
