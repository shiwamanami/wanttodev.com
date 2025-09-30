"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import { useWorksData } from "../hooks/useWorksData";
import { useParams } from "react-router-dom";

export default function WorksSwiper() {
  const { id } = useParams<{ id: string }>();
  const { getWork } = useWorksData();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const workId = id ? parseInt(id, 10) : 0;
  const work = getWork(workId);

  if (!work) {
    return <div>作品が見つかりません</div>;
  }

  const mediaList = [...work.mediaData.videos, ...work.mediaData.images];
  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 w-full h-[80%]"
      >
        {mediaList.map((item, index) => (
          <SwiperSlide key={index}>
            {item.type === "image" ? (
              <img src={item.src} alt={`Slide ${index + 1}`} />
            ) : (
              <div className="relative w-full pb-[56.25%]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper w-full h-[20%] box-border !pt-5"
      >
        {mediaList.map((item, index) => (
          <SwiperSlide key={index}>
            {item.type === "image" ? (
              <img src={item.src} alt={`Slide ${index + 1}`} />
            ) : (
              <div className="relative w-full pb-[56.25%]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
