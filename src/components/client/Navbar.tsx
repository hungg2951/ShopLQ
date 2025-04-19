import Link from "next/link";
import React from "react";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className="hidden md:flex space-x-6">
      <Link href="/" className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent hover:from-pink-500 hover:via-yellow-500 hover:to-red-500 transition-all duration-500">
        Trang chủ
      </Link>
      <Link href="/lich-su-nap" className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent hover:from-pink-500 hover:via-yellow-500 hover:to-red-500 transition-all duration-500">
        Lịch sử nạp
      </Link>
      <Link href="/lich-su-mua" className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent hover:from-pink-500 hover:via-yellow-500 hover:to-red-500 transition-all duration-500">
        Lịch sử mua
      </Link>
      <Link href="/nap-coin" className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent hover:from-pink-500 hover:via-yellow-500 hover:to-red-500 transition-all duration-500">
        Nạp coin
      </Link>
    </nav>
  );
};

export default Navbar;
