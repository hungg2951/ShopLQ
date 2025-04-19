"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Navbar from "./Navbar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setIsVisible(true);
    setTimeout(() => setIsOpen(true), 10); // delay nhỏ để kích hoạt CSS animation
  };

  const closeMenu = () => {
    setIsOpen(false);
    setTimeout(() => setIsVisible(false), 500); // đợi animation hoàn tất mới unmount
  };

  // click ngoài để đóng menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-yellow-400 hover:opacity-80"
        >
        SHOP LQ
        </Link>

        {/* Menu desktop */}
        <Navbar/>

        <div className="hidden md:flex space-x-4">
          <Link
            href="/dang-nhap"
            className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300"
          >
            Đăng nhập
          </Link>
          <Link
            href="/dang-ky"
            className="border border-yellow-400 px-4 py-1 rounded hover:bg-yellow-400 hover:text-black"
          >
            Đăng ký
          </Link>
        </div>

        <button onClick={openMenu} className="md:hidden text-yellow-400">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isVisible && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Slide menu */}
          <div
            ref={menuRef}
            className={`fixed right-0 top-0 h-full w-64 bg-gray-800 p-6 transform transition-transform duration-500 ease-in-out
              ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-yellow-400">Menu</h2>
              <button onClick={closeMenu}>
                <X size={24} className="text-yellow-400" />
              </button>
            </div>
            <Link
              href="/"
              className="block py-2 hover:text-yellow-400"
              onClick={closeMenu}
            >
              Trang chủ
            </Link>
            <Link
              href="/lich-su-nap"
              className="block py-2 hover:text-yellow-400"
              onClick={closeMenu}
            >
              Lịch sử nạp
            </Link>
            <Link
              href="/lich-su-mua"
              className="block py-2 hover:text-yellow-400"
              onClick={closeMenu}
            >
              Lịch sử mua
            </Link>
            <Link
              href="/nap-coin"
              className="block py-2 hover:text-yellow-400"
              onClick={closeMenu}
            >
              Nạp coin
            </Link>
            <hr className="border-gray-700 my-2" />
            <Link
              href="/dang-nhap"
              className="block py-2 hover:text-yellow-400"
              onClick={closeMenu}
            >
              Đăng nhập
            </Link>
            <Link
              href="/dang-ky"
              className="block py-2 hover:text-yellow-400"
              onClick={closeMenu}
            >
              Đăng ký
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
