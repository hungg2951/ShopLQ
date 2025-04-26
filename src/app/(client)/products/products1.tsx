"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import AccCard from "@/components/client/product";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Product1() {
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts`,
    fetcher
  );
  if (isLoading) return <div>loading...</div>;
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
        {data?.accounts.map((item: TAccount) => (
          <SwiperSlide>
            <Link href={item.code}>
              <AccCard
                code={item.code}
                rank={item.rank}
                price={item.price}
                discount={item.discount || 0}
                matches={item.matches || 0}
                champions={item.champions}
                skins={item.skins}
                runes={item.runes}
                image={item.image}
                isSold = {item.isSold}
              />
            </Link>
          </SwiperSlide>
        ))}
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
