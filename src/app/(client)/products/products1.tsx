"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import AccCard from "@/components/client/product";
import Link from "next/link";
import { Navigation } from "swiper/modules";

export default function Product1() {
  return (
    <div className="bg-red-700 py-8 px-4 text-white rounded-xl relative">
      <h2 className="text-2xl font-bold mb-4">ACC LQ V.I.P</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        <SwiperSlide>
          <Link href="/accviphuhu">
            <AccCard
              id="G5071"
              rank="Kim Cương 1"
              rankColor="text-pink-500"
              priceOld={690000}
              priceNew={337610}
              discount={51}
              matchCount={752}
              heroCount={47}
              skinCount={51}
              runeLevel="140v"
              image="https://lightlauriel.com/upload/G5071-NAME_IT_NEW_LIGHT.jpg"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <AccCard
            id="G5061"
            rank="Kim Cương 5"
            rankColor="text-pink-500"
            priceOld={909000}
            priceNew={409050}
            discount={55}
            matchCount={1893}
            heroCount={78}
            skinCount={110}
            runeLevel="190v"
            image="https://lightlauriel.com/upload/G5061-NAME_IT_NEW_LIGHT.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <AccCard
            id="G5136"
            rank="Bạch Kim 1"
            rankColor="text-red-500"
            priceOld={959000}
            priceNew={421960}
            discount={56}
            matchCount={3634}
            heroCount={95}
            skinCount={181}
            runeLevel="270v"
            image="https://lightlauriel.com/upload/G5136-NAME_IT_NEW_LIGHT.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <AccCard
            id="G5122"
            rank="Kim Cương 3"
            rankColor="text-pink-500"
            priceOld={938000}
            priceNew={422100}
            discount={55}
            matchCount={2838}
            heroCount={82}
            skinCount={133}
            runeLevel="190v"
            image="https://lightlauriel.com/upload/G5122-NAME_IT_NEW_LIGHT.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <AccCard
            id="G5122"
            rank="Kim Cương 3"
            rankColor="text-pink-500"
            priceOld={938000}
            priceNew={422100}
            discount={55}
            matchCount={2838}
            heroCount={82}
            skinCount={133}
            runeLevel="190v"
            image="https://lightlauriel.com/upload/G5122-NAME_IT_NEW_LIGHT.jpg"
          />
        </SwiperSlide>
      </Swiper>
      {/* Nút điều hướng */}
      <div>
        <div className="absolute top-1/2 rounded-tr-xl rounded-br-xl bg-black -translate-y-1/2 left-0 z-10 swiper-button-prev flex items-center justify-center cursor-pointer "></div>
        <div className="absolute top-1/2 bg-black rounded-tl-xl rounded-bl-xl -translate-y-1/2 right-0 z-10 swiper-button-next flex items-center justify-center cursor-pointer "></div>
      </div>
      <div className="mt-6 text-center">
        <button className="bg-white text-red-700 font-bold px-6 py-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <Link href={`#`}>XEM KHO LQ V.I.P</Link>
        </button>
      </div>
    </div>
  );
}
