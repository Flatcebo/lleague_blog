"use client";

import {useEffect, useLayoutEffect, useRef, useState} from "react";
import Slider, {Settings} from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import Image from "next/image";

interface SliderProps {
  data: [] | any;
  props: {
    width: string;
    height: string;
    arrow: boolean;
  };
  //   children: React.ReactNode;
}

export default function ImgSlider({data, props}: SliderProps) {
  const [count, setCount] = useState(0);
  const [side, setSide] = useState(false);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0, true);
    }
  }, [data]);

  function PrevArrow({className, style, onClick}: any) {
    return (
      <IoIosArrowBack
        size={80}
        className={className}
        style={{
          ...style,
          display: "block",
          background: side && "#333333bc",
          width: side ? 40 : 80,
          height: side ? 40 : 80,
          left: side ? 16 : -200,
          zIndex: 3,
          borderRadius: 6,
        }}
        onClick={onClick}
        color="#ffffff"
      />
    );
  }

  function NextArrow({className, style, onClick}: any) {
    return (
      <IoIosArrowForward
        size={80}
        className={className}
        style={{
          ...style,
          display: "block",
          background: side && "#333333bc",
          width: side ? 40 : 80,
          height: side ? 40 : 80,
          right: side ? 16 : -200,
          zIndex: 3,
          borderRadius: 6,
        }}
        onClick={onClick}
        color="#ffffff"
      />
    );
  }

  const settings: Settings = {
    dots: true,

    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: props.arrow,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current: any) => setCount(current),
  };

  return (
    // <section className="flex justify-center">
    <div
      className="flex-col"
      style={{
        width: `calc(${props.width} * 3)`,
      }}
    >
      <Slider {...settings} className="mb-6 px-0" ref={sliderRef}>
        {data.map((img: any, imgIdx: number) => {
          return (
            <button
              key={imgIdx}
              className={`w-[${props.width}] h-auto flex flex-col justify-center items-center gap-[10px] rounded-[20px]`}
            >
              <Image
                src={img.src}
                alt={img.src}
                width={4000}
                height={4000}
                draggable={false}
                className={`w-[${props.width}] h-[${props.height}] flex-shrink-0 object-contain rounded-[20px]`}
              />
              <span className="text-center text-[12px]">{img.title}</span>
            </button>
          );
        })}
      </Slider>
    </div>
  );
}
