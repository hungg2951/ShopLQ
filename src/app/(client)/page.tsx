import Link from "next/link";
import React from "react";

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="bg-[url('https://lightlauriel.com/img/bg-home-2024.jpg')] bg-repeat">
      <div className="max-w-7xl mx-auto p-4 max-sm:p-2 overflow-hidden">
        {/* banner */}
        <div className="flex justify-between gap-4 max-sm:block">
          <div className="">
            <img
              className="rounded-xl"
              src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1745035593/shoplq/l2byzpgroeqwqyfmq59d.png"
              alt=""
            />
          </div>
          <div className="w-1/3 max-sm:hidden">
            <img
              className="rounded-xl mb-4"
              src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1745035592/shoplq/o970rbjrpn0v3qle3vdl.jpg"
              alt=""
            />
            <img
              className="rounded-xl"
              src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1745035592/shoplq/hew6ajbtkosyb6yfwgvs.jpg"
              alt=""
            />
          </div>
        </div>

        {/* bank */}
        <div className="flex gap-2 w-full my-4 max-sm:my-2 max-sm:gap-1">
          <img
            className="rounded-xl max-w-[33%] object-cover"
            src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1745036673/n8qlaf2imrqskedn6gdz.jpg"
            alt=""
          />
          <img
            className="rounded-xl max-w-[33%] object-cover"
            src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1745036673/jckee7klayb52o4g7geh.jpg"
            alt=""
          />
          <img
            className="rounded-xl max-w-[33%] object-cover"
            src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1745036673/gjjnesrkc1otytj6g0tg.jpg"
            alt=""
          />
        </div>

        {/* danh mục */}
        <div className="w-full overflow-hidden my-5">
          <div className="flex justify-between gap-5 max-sm:overflow-x-auto">
            <Link
              href="#"
              className="bg-gray-300 hover:bg-gray-500 rounded-3xl group w-[20%] max-sm:w-[40%]"
            >
              <div className="p-10 text-sm">
                <figure className="w-[100px] h-[100px] max-sm:w-[75px] max-sm:h-[75px] mx-auto">
                  <img
                    className="group-hover:scale-105 transition-all"
                    src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1745038325/pl3a3azyn4md3svghrbr.png"
                    alt=""
                  />
                </figure>
                <p className="text-center pt-2 group-hover:text-white">
                  Kho Acc
                </p>
              </div>
            </Link>
            <Link
              href="#"
              className="bg-gray-300 hover:bg-gray-500  rounded-3xl group w-[20%] max-sm:w-[40%] "
            >
              <div className="p-10 text-sm">
                <figure className="w-[100px] h-[100px] max-sm:w-[75px] max-sm:h-[75px] mx-auto">
                  <img
                    className="group-hover:scale-105 transition-all "
                    src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1745038324/cra8jh2kyi74fhuren54.png"
                    alt=""
                  />
                </figure>
                <p className="text-center pt-2 group-hover:text-white">
                  Acc LQ giá rẻ
                </p>
              </div>
            </Link>
            <Link
              href="#"
              className="bg-gray-300 hover:bg-gray-500  rounded-3xl group w-[20%] max-sm:w-[40%]"
            >
              <div className="p-10 text-sm">
                <figure className="w-[100px] h-[100px] max-sm:w-[75px] max-sm:h-[75px] mx-auto">
                  <img
                    className="group-hover:scale-105 transition-all "
                    src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1745038324/zdr3dh5dphauv59rw1sy.png"
                    alt=""
                  />
                </figure>
                <p className="text-center pt-2 group-hover:text-white">
                  Acc VIP
                </p>
              </div>
            </Link>
            <Link
              href="#"
              className="bg-gray-300 hover:bg-gray-500  rounded-3xl group w-[20%] max-sm:w-[40%] "
            >
              <div className="p-10 text-sm">
                <figure className="w-[100px] h-[100px] max-sm:w-[75px] max-sm:h-[75px] mx-auto">
                  <img
                    className="group-hover:scale-105 transition-all  max-sm:h-[75px] "
                    src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1745038323/zyi5pfdcqdjsfhglbxac.png"
                    alt=""
                  />
                </figure>
                <p className="text-center pt-2 group-hover:text-white">
                  Mác chiến tướng
                </p>
              </div>
            </Link>
            <Link
              href="#"
              className="bg-gray-300 hover:bg-gray-500  rounded-3xl group w-[20%] max-sm:w-[40%] "
            >
              <div className="p-10 text-sm">
                <figure className="w-[100px] h-[100px] max-sm:w-[75px] max-sm:h-[75px] mx-auto">
                  <img
                    className="group-hover:scale-105 transition-all  "
                    src="https://res.cloudinary.com/dnyx3a5yj/image/upload/v1745038294/u1bwxb66fducp72ajkaz.png"
                    alt=""
                  />
                </figure>
                <p className="text-center pt-2 group-hover:text-white">
                  Rank cao thủ
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
