import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PatternImg from "@/assets/images/Pattern.png";
import "./Slider.css";

export type Direction = "left" | "right";
export type SliderButtonVariant = "white" | "gray";

type SliderProps<T> = {
  slides: T[];
  renderSlide: (item: T) => React.ReactNode;
  height?: string; // optional height
  hasPatternBackground?: boolean;
  hasBackgroundXMask?: boolean;
  sliderButtonVariant?: SliderButtonVariant;
};

export default function Slider<T>({
  slides,
  renderSlide,
  height = "h-[21.5rem]",
  hasPatternBackground = false,
  hasBackgroundXMask = false,
  sliderButtonVariant = "white",
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
      className={`relative w-full overflow-hidden rounded-lg ${
        hasPatternBackground ? "bg-primary text-white " : ""
      } ${height}`}
    >
      {hasPatternBackground && (
        <div
          style={{ backgroundImage: `url(${PatternImg})` }}
          className="absolute inset-0 bg-cover bg-no-repeat"
        ></div>
      )}

      <div
        className={` ${
          hasBackgroundXMask ? "mask-gradient mx-auto h-full w-[92%]" : ""
        }`}
      >
        <AnimatePresence custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute flex h-full w-full flex-col justify-center px-20 py-4 text-left"
          >
            {renderSlide(slides[index])}
          </motion.div>
        </AnimatePresence>
      </div>

      <SliderButton
        classes="left-6"
        icon={<ChevronLeft />}
        direction="left"
        paginate={paginate}
        sliderButtonVariant={sliderButtonVariant}
      />

      <SliderButton
        classes="right-6"
        icon={<ChevronRight />}
        direction="right"
        paginate={paginate}
        sliderButtonVariant={sliderButtonVariant}
      />
    </div>
  );
}

type SliderButtonProps = {
  classes: string;
  icon: React.ReactNode;
  direction: "left" | "right";
  paginate: (dir: "left" | "right") => void;
  sliderButtonVariant?: SliderButtonVariant;
};

const SliderButton: React.FC<SliderButtonProps> = ({
  classes,
  icon,
  direction,
  paginate,
  sliderButtonVariant,
}) => {
  return (
    <button
      className={`absolute top-1/2 -translate-y-1/2 scale-100 rounded-full bg-[rgba(244,244,244,0.73)] p-1 text-[#363636] transition-all duration-200 ease-in-out hover:scale-105  
        ${classes} ${
        sliderButtonVariant === "white" ? "hover:bg-white" : "hover:bg-gray-200"
      }`}
      onClick={() => paginate(direction)}
    >
      {icon}
    </button>
  );
};
