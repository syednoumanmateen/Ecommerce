"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CustomSwiper = ({
  slides = [],
  navigation = false,
  pagination = false,
  autoplay = true,
  loop = true,
  slidesPerView = 1,
  spaceBetween = 20,
  className = "",
  imgWidth = "100%",
  imgHeight = "200px",
  objectFit = "cover",
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
        <SwiperSlide key={i} className="flex items-center justify-center">
          {typeof slide === "string" ? (
            <img
              src={slide}
              alt={`slide-${i}`}
              style={{
                width: imgWidth,
                height: imgHeight,
                objectFit: objectFit,
              }}
            />
          ) : (
            <div
              style={{
                width: imgWidth,
                height: imgHeight,
              }}
            >
              {slide}
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
