import Link from "next/link";
import React from "react";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className="hidden md:flex space-x-6">
      <Link href="/" className="hover:text-yellow-400">
        Trang chủ
      </Link>
      <Link href="/lich-su-nap" className="hover:text-yellow-400">
        Lịch sử nạp
      </Link>
      <Link href="/lich-su-mua" className="hover:text-yellow-400">
        Lịch sử mua
      </Link>
      <Link href="/nap-coin" className="hover:text-yellow-400">
        Nạp coin
      </Link>
    </nav>
  );
};

export default Navbar;
