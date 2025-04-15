"use client";

import {useRef} from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

interface CarouselProps {
  items?: PostProps[];
  w?: string;
  h?: string;

  className?: string;
  children?: React.ReactNode;
}

export default function CarouselLayout({children}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({
      left: -carouselRef.current.clientWidth / 2,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({
      left: carouselRef.current.clientWidth / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative w-full py-0`}>
      {/* BUTTON */}
      <div className="absolute top-0 w-full h-full flex justify-between items-center ">
        <button
          onClick={scrollLeft}
          className="ml-0 z-[998] text-[white] hover:text-[#cacaca] "
        >
          <IoIosArrowBack size={32} />
        </button>

        <button
          onClick={scrollRight}
          className="mr-0 z-[998] text-[white] hover:text-[#cacaca]"
        >
          <IoIosArrowForward size={32} />
        </button>
      </div>

      <div
        ref={carouselRef}
        className="relative flex overflow-x-scroll overflow-y-scroll snap-x snap-mandatory scrollbar-hide py-4
                      lg:gap-[12px] sm:gap-[12px] gap-[8px]
                      lg:px-[40px] sm:px-[40px] px-[12px]"
      >
        {children}
      </div>
    </div>
  );
}
