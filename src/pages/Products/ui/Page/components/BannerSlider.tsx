import "./Slider.css";
import Slider from "./Slider";

const slides = [
  {
    date: "September 12-22",
    title: "Enjoy Free Home Delivery This Summer",
    desc: "Designer Dresses - Pick from trendy Designer Dress.",
    cta: "Get Started",
  },
  {
    date: "October 1-10",
    title: "Exclusive Autumn Sale",
    desc: "Up to 40% off on seasonal essentials — limited-time only.",
    cta: "Shop Now",
  },
  {
    date: "November 15-25",
    title: "Black Friday Mega Deals",
    desc: "Unbeatable discounts on electronics, fashion, and more.",
    cta: "Explore Deals",
  },
  {
    date: "December 1-10",
    title: "Holiday Gift Guide",
    desc: "Find the perfect gifts for everyone on your list.",
    cta: "Browse Gifts",
  },
];

export default function BannerSlider() {
  return (
    <Slider
      slides={slides}
      renderSlide={(slide) => (
        <div className="relative h-full w-full text-white">
          <div className="relative z-10 flex h-full flex-col justify-center py-1 text-left">
            <p className="text-sm">{slide.date}</p>
            <h2 className="my-0.5 text-3xl font-bold">{slide.title}</h2>
            <p className="mb-1 text-lg text-white/80">{slide.desc}</p>
            <button className="w-min whitespace-nowrap rounded-[0.75rem] bg-[#FF8743] px-3 py-1 text-lg text-white">
              {slide.cta}
            </button>
          </div>
        </div>
      )}
      hasPatternBackground={true}
      height="h-80"
    />
  );
}
