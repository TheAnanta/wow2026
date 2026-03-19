"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type CarouselProps = {
  images: string[]; // array of image URLs
  border?: boolean; // optional prop to add border
};

const Carousel: React.FC<CarouselProps> = ({ images, border }) => {
  return (
    <Swiper
      className={`w-full h-full overflow-hidden ${border ? "border-2" : ""}`}
      modules={[Autoplay]}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      loop
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="w-full h-full object-cover">
          <img
            src={src}
            alt={`Gallery Image ${index + 1}`}
            loading="lazy"
            className="object-cover  w-full h-full max-h-72 shrink-0 grow"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
