import { Product } from "@/types/Product";
import Slider from "./Slider";
import Rating from "./Rating";
import Button from "@/components/Button";

const ProductCard = (props: Product) => {
  return (
    <div className="rounded-lg bg-white shadow-md">
      <Slider
        slides={props.images}
        renderSlide={(image: string) => <img src={image} alt={props.name} />}
        height="h-20"
      />
      <div className="p-2 flex flex-col gap-0.5">
        <h3 className="text-[1.125rem] font-bold">{props.name}</h3>
        <p className="text-[1rem] font-bold text-primary">${props.price}</p>
        <Rating rating={props.rating} />
        <Button className="mt-[0.75rem] w-min whitespace-nowrap" variant="secondary">Edit Product</Button>
      </div>
    </div>
  );
};

export default ProductCard;
