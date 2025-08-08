import StarRatings from "react-star-ratings";

export default function Rating({ rating }: { rating: number }) {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#FF9500"
      starEmptyColor="#00000033"
      numberOfStars={5}
      starDimension="16px"
      starSpacing="2px"
    />
  );
}
