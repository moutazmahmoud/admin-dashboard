import Slider from "./Slider";

type ProductCardProps = {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
};

const ProductCard = (props: ProductCardProps) => {
  return (
    <div>
      <Slider
        slides={props.images}
        renderSlide={(image: string) => <img src={image} alt={props.name} />}
      />
    </div>
  );
};

export default ProductCard;
