"use client";
import ModalInfoAccount from "@/components/client/modalInfoAccount";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
interface Props {}
const imgages = [
  "https://lightlauriel.com/upload/resize_gallery_all/z6389191593524_3b9af5b4e15dad286d77c95ffd43f2f4.jpg",
  "https://lightlauriel.com/upload/resize_gallery_all/z6389191515841_ddd63b862187e522dcddbbd58466c8f1.jpg",
  "https://lightlauriel.com/upload/resize_gallery_all/z6389191497847_0dbe669e1dbc8e221e731c2580941e15.jpg",
];
const ProductDetail = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [images, setImages] = React.useState<string[]>([]);
  const clickButton = (title: string) => {
    setTitle(title);
    setOpen(true);
    setImages(imgages);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Hình ảnh tướng dạng lục giác */}
      <img
        src="https://lightlauriel.com/upload/G5136-NAME_IT_NEW_LIGHT.jpg"
        alt=""
      />

      {/* Thông tin chi tiết tài khoản */}
      <div className=" bg-white rounded-lg p-6 shadow space-y-4 text-sm">
        <h2 className="text-2xl font-bold">LIÊN QUÂN G5136</h2>
        <div className="infoAccount">
          <p>
            Mã: <span className="font-medium">1742985818</span>
          </p>
          <p>
            Game: Liên Quân - Tình trạng: <span>Chưa bán</span>
          </p>
          <p>
            Tướng: <span>95</span> | Skin: <span>181</span> | Ngọc III:{" "}
            <span>270 viên</span>{" "}
          </p>
          <p>
            Rank hiện tại:
            <span>Bạch Kim 1</span> | Tỉ lệ thắng: <span>53%</span>
          </p>
          <p>
            Thẻ đổi tên: <span>2</span> | Vàng: <span>36K</span> | Số trận:{" "}
            <span>3.634</span> | Uy tín: <span>96</span> | Dấu ấn:{" "}
            <span>12</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <button
            onClick={() => clickButton("Chi tiết túi đồ")}
            className="bg-[#101828] text-white py-1 px-3 rounded hover:bg-red-700 w-16 cursor-pointer text-center"
          >
            <p className="text-2xl inline-block">
              <FaCaretDown />
            </p>
            Xem túi đồ
          </button>
          <button
            onClick={() => clickButton("Chi tiết trang phục")}
            className="bg-[#101828] text-white py-1 px-3 rounded hover:bg-red-700 w-16 cursor-pointer text-center"
          >
            <p className="text-2xl inline-block">
              <FaCaretDown />
            </p>
            Xem skin
          </button>
          <button
            onClick={() => clickButton("Chi tiết các tướng")}
            className="bg-[#101828] text-white py-1 px-3 rounded hover:bg-red-700 w-16 cursor-pointer text-center"
          >
            <p className="text-2xl inline-block">
              <FaCaretDown />
            </p>
            Xem tướng
          </button>
          <button
            onClick={() => clickButton("Chi tiết ngọc")}
            className="bg-[#101828] text-white py-1 px-3 rounded hover:bg-red-700 w-16 cursor-pointer text-center"
          >
            <p className="text-2xl inline-block">
              <FaCaretDown />
            </p>
            Xem ngọc
          </button>
        </div>
        <div className="text-3xl font-bold text-red-700">
          421,960₫{" "}
          <span className="line-through text-gray-500 text-base ml-2">
            959,000₫
          </span>{" "}
          <span className="text-sm bg-red-700 text-white px-2 py-0.5 rounded">
            -56%
          </span>
        </div>

        <button className="bg-[#101828] text-white w-full py-4 rounded font-semibold hover:bg-red-700 cursor-pointer">
          MUA & NHẬN ACC (Giao dịch tự động)
        </button>

        <ul className="text-sm space-y-1 text-gray-700">
          <li>✔️ Tài khoản đăng nhập Garena, chưa liên kết Facebook</li>
          <li>✔️ Email đã khóa/chết (thêm CCCD vào sẽ xóa được email)</li>
          <li className="text-red-600 font-medium">
            + Chú ý: Thêm được CCCD để xóa email. Shop hỗ trợ đầy đủ sau khi đổi
            thông tin xong cho người mua.
          </li>
          <li>✔️ Có số điện thoại - Hỗ trợ thay đổi (miễn phí)</li>
          <li>
            ✔️ Ngày thay đổi gần nhất:{" "}
            <span className="text-green-600">26/03/2025</span>
          </li>
          <li className="text-green-600 font-medium">
            + Lưu ý: Nhắn đúng số điện thoại đã đăng ký để tránh nhầm lẫn khi
            đổi thông tin cho người mua.
          </li>
          <li className="text-red-600 font-medium">
            + Quan trọng: Nhắn tin Chat Web/Zalo để xác nhận đã nhận được acc và
            bảo mật tránh mất acc.
          </li>
        </ul>
      </div>
      {/* thông tin */}
      <ModalInfoAccount
        open={open}
        title={title}
        close={() => setOpen(false)}
        images={images}
      />
    </div>
  );
};

export default ProductDetail;
