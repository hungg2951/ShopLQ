"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Navbar from "./Navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "antd";

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

  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    closeMenu();
    router.push("/login");
  };

  return (
    <header className="bg-gradient-to-r from-black via-[#0b0b2b] to-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text hover:opacity-80"
        >
          SHOP LQ
        </Link>

        {/* Menu desktop */}
        <Navbar />
        <div className="hidden md:block">
          {!isLoggedIn ? (
            <div className="space-x-4 flex">
              <Link
                href="/dang-nhap"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:scale-105 transition-transform duration-300 px-4 py-1 rounded hover:bg-yellow-300"
              >
                Đăng nhập
              </Link>
              <Link
                href="/dang-ky"
                className="bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:scale-105 transition-transform duration-300 px-4 py-1 rounded hover:bg-yellow-300"
              >
                Đăng ký
              </Link>
            </div>
          ) : (
            <div className="relative group py-3 flex justify-between items-center gap-2 ">
              <figure className="w-10 h-10 cursor-pointer">
                <img className="rounded-[50%]" src={user?.avatar} alt="" />
              </figure>
              <div className="cursor-pointer">
                <p>Xin chào {user?.username}</p>
              </div>
              <div className="bg-white absolute min-w-[200px] min-h-[100px] shadow-lg rounded-lg top-14 right-0 p-4 hidden group-hover:block">
                <div className="flex justify-between items-center gap-2">
                  <div className="text-sm text-black">
                    <p>
                      Số dư: <span className="text-red-800">${(user?.coin).toLocaleString("vi-vn")}</span>
                    </p>
                  </div>
                </div>
                <hr className="border-gray-300 my-2" />
                <div className="mx-auto flex justify-center mt-5">
                  <Button
                    className="text-center"
                    onClick={() => handleLogout()}
                  >
                    Đăng xuất
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <button onClick={openMenu} className="md:hidden text-white">
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
              <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text hover:opacity-80">
                SHOP LQ
              </h2>
              <button onClick={closeMenu}>
                <X size={24} className="text-white" />
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
            {!isLoggedIn ? (
              <div>
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
            ) : (
              <div className="mt-5">
                <div className="flex justify-between items-center gap-2">
                  <figure className="w-10 h-10 cursor-pointer ">
                    <img className="rounded-[50%]" src={user?.avatar} alt="" />
                  </figure>
                  <div className="text-sm">
                    <p>{user?.username}</p>
                    <p>{user?.email}</p>
                  </div>
                </div>
                <div className="mx-auto flex justify-center mt-5">
                  <Button
                    className="text-center"
                    onClick={() => handleLogout()}
                  >
                    Đăng xuất
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
