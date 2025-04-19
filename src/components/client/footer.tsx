import Link from "next/link";
import { FaFacebookMessenger } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black via-[#0b0b2b] to-black text-white text-sm pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo + Giới thiệu */}
        <div>
          <p className="uppercase text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text mb-2">SHOP LIENQUAN</p>
          <p className="text-gray-300">
            Shop Game Liên Quân Uy Tín - Chất Lượng Số 1 Việt Nam. Chuyên Cung
            Cấp Acc Giá Rẻ Nhất Thị Trường. Đội Ngũ Chăm Sóc Khách Hàng Hỗ Trợ
            24/7.
          </p>
          <p className="text-red-700 font-semibold mt-4">
            HỆ THỐNG BÁN ACC TỰ ĐỘNG ĐẢM BẢO UY TÍN VÀ CHẤT LƯỢNG.
          </p>
          <p className="text-gray-400 mt-2">
            Chúng tôi luôn lấy uy tín đặt lên hàng đầu đối với khách hàng. Cảm
            ơn!
          </p>
          <ul className="mt-4 space-y-1">
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                › Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                › Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Thông tin chung */}
        <div>
          <h3 className="font-semibold mb-3">THÔNG TIN CHUNG</h3>
          <ul className="text-gray-300 space-y-2">
            <li>
              <Link href="#">› Chính Sách Bảo Hành</Link>
            </li>
            <li>
              <Link href="#">› Hướng Dẫn Tạo Tài Khoản Shop</Link>
            </li>
            <li>
              <Link href="#">› Hướng Dẫn Nạp Tiền Tại Shop</Link>
            </li>
            <li>
              <Link href="#">› Hướng Dẫn Đổi Thông Tin Nick</Link>
            </li>
            <li>
              <Link href="#">› Hướng Dẫn Đăng Nhập Free Fire</Link>
            </li>
          </ul>
        </div>

        {/* Sản phẩm */}
        <div>
          <h3 className="font-semibold mb-3">SẢN PHẨM</h3>
          <ul className="text-gray-300 space-y-2">
            <li>
              <Link href="#">› Nick Liên Quân Giảm Giá</Link>
            </li>
            <li>
              <Link href="#">› Thử Vận May Nick & Quân Huy</Link>
            </li>
            <li>
              <Link href="#">› Nick Free Fire & Nổ Hũ Kim Cương</Link>
            </li>
            <li>
              <Link href="#">› Nick Roblox Siêu Rẻ</Link>
            </li>
            <li>
              <Link href="#">› Nick LMHT Giá Siêu Mềm</Link>
            </li>
          </ul>
        </div>

        {/* Hỗ trợ khách hàng */}
        <div className="flex flex-col items-start md:items-center">
          <h3 className="font-semibold mb-3">HỖ TRỢ KHÁCH HÀNG</h3>
          <a
            href="https://m.me/hung2951"
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full flex items-center gap-2"
          >
            <FaFacebookMessenger />
            CHAT VỚI CHÚNG TÔI
          </a>
        </div>
      </div>

      {/* Thời gian hỗ trợ + copyright */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm px-4">
        <p>
          Thời gian hỗ trợ:{" "}
          <strong className="text-white">
            Sáng: 8h00 → 11h30 | Chiều: 13h00 → 21h00
          </strong>
        </p>
        <p className="mt-2">© Copyright 2023</p>
        <p>
          Operated by{" "}
          <span className="text-red-700 font-semibold">
            Hung2951
          </span>
          , All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
