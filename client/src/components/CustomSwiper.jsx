// CustomSwiper.jsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CustomSwiper = ({
  slides = [],             // can be JSX or strings
  navigation = false,
  pagination = false,
  autoplay = true,
  loop = true,
  slidesPerView = 1,
  spaceBetween = 20,
  className = "",
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={navigation}
      pagination={pagination ? { clickable: true } : false}
      autoplay={autoplay ? { delay: 2500 } : false}
      loop={loop}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      className={`w-full ${className}`}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          {typeof slide === "string" ? (
            <img
              src={slide}
              alt={`slide-${i}`}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            slide
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
