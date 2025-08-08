import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PatternImg from "@/assets/images/pattern.png";
import "./Slider.css";

export type Direction = "left" | "right";

type SliderProps<T> = {
  slides: T[];
  renderSlide: (item: T) => React.ReactNode;
  height?: string; // optional height
  hasPatternBackground?: boolean;
};

export default function Slider<T>({
  slides,
  renderSlide,
  height = "h-80",
  hasPatternBackground = false,
}: SliderProps<T>) {
  const [[index, direction], setIndex] = useState<[number, Direction]>([
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
    <div
      className={`relative h-80 w-full overflow-hidden rounded-lg ${
        hasPatternBackground ? "bg-primary text-white" : ""
      }  ${height}`}
    >
      {hasPatternBackground && (
        <div
          style={{ backgroundImage: `url(${PatternImg})` }}
          className="absolute inset-0 bg-cover bg-no-repeat"
        ></div>
      )}

      <div className="mask-gradient mx-auto h-full w-[92%]">
        <AnimatePresence custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute flex h-full w-full flex-col justify-center px-5 py-1 text-left"
          >
            {renderSlide(slides[index])}
          </motion.div>
        </AnimatePresence>
      </div>

      <SliderButton
        classes="left-1.5"
        icon={<ChevronLeft />}
        direction="left"
        paginate={paginate}
      />

      <SliderButton
        classes="right-1.5"
        icon={<ChevronRight />}
        direction="right"
        paginate={paginate}
      />
    </div>
  );
}

type SliderButtonProps = {
  classes: string;
  icon: React.ReactNode;
  direction: "left" | "right";
  paginate: (dir: "left" | "right") => void;
};

const SliderButton: React.FC<SliderButtonProps> = ({
  classes,
  icon,
  direction,
  paginate,
}) => {
  return (
    <button
      className={`absolute top-1/2 -translate-y-1/2 scale-100 rounded-full bg-[rgba(244,244,244,0.73)] p-[0.25rem] text-[#363636] transition-all duration-200 ease-in-out hover:scale-105 hover:bg-white ${classes}`}
      onClick={() => paginate(direction)}
    >
      {icon}
    </button>
  );
};
