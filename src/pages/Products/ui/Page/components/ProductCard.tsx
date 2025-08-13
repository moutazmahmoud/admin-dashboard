import { Product } from "@/types/Product";
import Slider from "./Slider";
import Rating from "./Rating";
import Button from "@/components/Button";
import { Heart } from "lucide-react";

const ProductCard = (props: Product) => {
  return (
    <div className="rounded-lg bg-white shadow-md">
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
      <div className="flex w-full justify-between p-6">
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
          <Button className="mt-3 w-min whitespace-nowrap" variant="secondary">
            Edit Product
          </Button>
        </div>
        <button className="h-min rounded-full bg-[#F9F9F9] p-2">
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
