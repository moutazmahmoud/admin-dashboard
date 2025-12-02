import { Product } from "@/types/Product";
import Slider from "./Slider";
import Rating from "@/components/Rating";
import Button from "@/components/Button";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProductModal } from "@/components/ProductModal";
import { useFavoritesStore } from "@/store/useFavoritesStore";

const ProductCard = (props: Product) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(props.id));

  const onViewProduct = () => () => {
    navigate(`/products/${props.id}`);
  };

  const onEditProduct = () => () => {
    setEditingProduct(props);
    setModalOpen(true);
  };

  const handleSave = (data: Omit<Product, "id"> & { id?: number }) => {
    if (data.id) {
      // تعديل
      setProducts((prev) =>
        prev.map((p) => (p.id === data.id ? { ...p, ...data } : p)),
      );
    } else {
      // إضافة
      const newProduct: Product = {
        ...data,
        id: Date.now(),
      };
      setProducts((prev) => [...prev, newProduct]);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <Slider
        slides={props.images}
        renderSlide={(image: string) => (
          <img
            src={image}
            alt={props.name}
            className="h-full w-full object-contain"
          />
        )}
        height="h-[20rem]"
        sliderButtonVariant="gray"
      />
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-[1.125rem] font-bold leading-tight">
            {props.name}
          </h3>
          <p className="text-[1rem] font-bold leading-tight text-primary">
            ${props.price.toFixed(2)}
          </p>
          <div className="flex h-5 items-center">
            <Rating rating={props.rating} />
            <div className="ml-1 pt-1 text-sm leading-tight text-gray-500">
              ({props.reviewsCount})
            </div>
          </div>
        </div>
        <button className="h-min rounded-full bg-[#F9F9F9] p-2" onClick={() => toggleFavorite(props)}>
          <Heart className={`h-4 w-4 text-red-500` + (isFavorite ? " fill-red-500" : "")}  />
        </button>
      </div>
      <div className="flex w-full justify-between">
        <Button
          className="mt-3 w-min whitespace-nowrap"
          variant="secondary"
          onClick={onEditProduct()}
        >
          Edit Product
        </Button>
        <Button
          className="mt-3 w-min whitespace-nowrap"
          variant="primary"
          onClick={onViewProduct()}
        >
          View Product
        </Button>
      </div>
      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialProduct={editingProduct}
      />
    </div>
  );
};

export default ProductCard;
