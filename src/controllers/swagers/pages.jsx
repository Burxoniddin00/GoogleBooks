"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import book from "../../img/books.jpg";
import book2 from "../../img/books2.jpg";
import kitob from "../../img/kitob.jpg";
import "swiper/css";
import Image from "next/image";

const Pages = () => {
  return (
    <>
      <Swiper
        className="text-black mt-2"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ dragSize: true }}
      >
        <SwiperSlide>
          <Image className="swiper-slide-img" src={book} alt="book" />
        </SwiperSlide>
        <SwiperSlide>
          <Image className="swiper-slide-img" src={book2} alt="book" />
        </SwiperSlide>
        <SwiperSlide>
          <Image className="swiper-slide-img" src={kitob} alt="book" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Pages;
