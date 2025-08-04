import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PatternImg from "@/assets/images/pattern.png";

const slides = [
  {
    date: "September 12–22",
    title: "Enjoy Free Home Delivery This Summer",
    desc: "Designer Dresses – Pick from trendy Designer Dress.",
    cta: "Get Started",
  },
  {
    date: "October 1–10",
    title: "Exclusive Autumn Sale",
    desc: "Up to 40% off on seasonal essentials — limited-time only.",
    cta: "Shop Now",
  },
  {
    date: "November 15–25",
    title: "Black Friday Mega Deals",
    desc: "Unbeatable discounts on electronics, fashion, and more.",
    cta: "Explore Deals",
  },
  {
    date: "December 1–10",
    title: "Holiday Gift Guide",
    desc: "Find the perfect gifts for everyone on your list.",
    cta: "Browse Gifts",
  },
];

export default function Slider() {
  const [[index, direction], setIndex] = useState<[number, "left" | "right"]>([
    0,
    "right",
  ]);

  const paginate = (newDirection: "left" | "right") => {
    setIndex(([prevIndex]) => {
      const newIndex =
        newDirection === "right"
          ? (prevIndex + 1) % slides.length
          : (prevIndex - 1 + slides.length) % slides.length;

      return [newIndex, newDirection];
    });
  };

  const variants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? "-100%" : "100%",
      opacity: 1,
    }),
  };

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-primary text-white">
      <div
        style={{ background: `url(${PatternImg})` }}
        className="absolute inset-0"
      ></div>
      <AnimatePresence custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute flex h-full w-full flex-col justify-center px-8 py-1 text-left"
        >
          <p className="text-sm">{slides[index].date}</p>
          <h2 className="my-0.5 text-3xl font-bold">{slides[index].title}</h2>
          <p className="mb-1 text-lg text-white/80">{slides[index].desc}</p>
          <button className="w-min whitespace-nowrap rounded-[0.75rem] bg-[#FF8743] px-3 py-1 text-lg text-white">
            {slides[index].cta}
          </button>
        </motion.div>
      </AnimatePresence>

      <button
        className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-full bg-[#F4F4F4] p-[0.25rem] text-[#363636]"
        onClick={() => paginate("left")}
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-[#F4F4F4] p-[0.25rem] text-[#363636]"
        onClick={() => paginate("right")}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
