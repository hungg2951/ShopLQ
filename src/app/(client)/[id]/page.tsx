"use client";
import ModalInfoAccount from "@/components/client/modalInfoAccount";
import { fetcher } from "@/lib/fetcher";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import useSWR from "swr";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { orderAPI } from "@/api/order";

const ProductDetail = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [images, setImages] = React.useState<string[]>([]);

  const { id } = useParams();

  const { user, isLoggedIn,mutateUser } = useAuth();

  const router =useRouter()

  const clickButton = (title: string, payload: string[]) => {
    setTitle(title);
    setOpen(true);
    setImages(payload);
  };

  const { data, isLoading } = useSWR<TAccount>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/${id}`,
    fetcher
  );

  

  if (isLoading) return <div>loading...</div>;
  if (!data) return;

  const payment = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Vui lòng đăng nhập",
        text: "Vui lòng đăng nhập để có thể sử dụng tính năng này!",
        icon: "warning",
      });
      return;
    }

    Swal.fire({
      title: "Mua tài khoản?",
      text: ` Bạn có đồng ý mua tài khoản ${
        data?.code
      } với giá ${data?.price?.toLocaleString()}đ không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy bỏ!",
    }).then((result) => {
      if (result.isConfirmed) {
        orderAPI
          .create({ idAcc: data._id! })
          .then(() => {
            mutateUser()
            Swal.fire({
              title: "Giao dịch thành công!",
              text: "Vui lòng kiểm tra email để lấy thông tin account.",
              icon: "success",
            });
            router.push("/lich-su-mua")
          })
          .catch(({response}) => {
            Swal.fire({
              title: "Giao dịch thất bại!",
              text: response?.data?.message,
              icon: "warning",
            });
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Hình ảnh tướng dạng lục giác */}
      <img src={data.image} alt="" />

      {/* Thông tin chi tiết tài khoản */}
      <div className=" bg-white rounded-lg p-6 shadow space-y-4 text-sm">
        <h2 className="text-2xl font-bold">LIÊN QUÂN {data.code}</h2>
        <div className="infoAccount">
          <p>
            Mã: <span className="font-medium">{data.code}</span>
          </p>
          <p>
            Game: Liên Quân - Tình trạng:{" "}
            <span>{data.isSold ? "Đã bán" : "Chưa bán"}</span>
          </p>
          <p>
            Tướng: <span>95</span> | Skin: <span>181</span> | Ngọc III:{" "}
            <span>{data.runes} viên</span>{" "}
          </p>
          <p>
            Rank hiện tại:
            <span> {data.rank}</span> | Tỉ lệ thắng:{" "}
            <span>{data.winRate}%</span>
          </p>
          <p>
            Rank cao nhất <span>{data.highestRank}</span>
          </p>
          <p>
            Thẻ đổi tên: <span>{data.renameCards}</span> | Vàng:{" "}
            <span>{data.gold?.toLocaleString()}</span> | Số trận:{" "}
            <span>{data.matches?.toLocaleString()}</span> | Uy tín:{" "}
            <span>{data.reputation}</span> | Dấu ấn:{" "}
            <span>{data.impressions}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <button
            onClick={() => clickButton("Chi tiết túi đồ", data.bagImages ?? [])}
            className="bg-[#101828] text-white py-1 px-3 rounded hover:bg-red-700 w-16 cursor-pointer text-center"
          >
            <p className="text-2xl inline-block">
              <FaCaretDown />
            </p>
            Xem túi đồ
          </button>
          <button
            onClick={() =>
              clickButton("Chi tiết trang phục", data.skinImages ?? [])
            }
            className="bg-[#101828] text-white py-1 px-3 rounded hover:bg-red-700 w-16 cursor-pointer text-center"
          >
            <p className="text-2xl inline-block">
              <FaCaretDown />
            </p>
            Xem skin
          </button>
          <button
            onClick={() =>
              clickButton("Chi tiết các tướng", data.champImages ?? [])
            }
            className="bg-[#101828] text-white py-1 px-3 rounded hover:bg-red-700 w-16 cursor-pointer text-center"
          >
            <p className="text-2xl inline-block">
              <FaCaretDown />
            </p>
            Xem tướng
          </button>
          <button
            onClick={() => clickButton("Chi tiết ngọc", data.runeImages ?? [])}
            className="bg-[#101828] text-white py-1 px-3 rounded hover:bg-red-700 w-16 cursor-pointer text-center"
          >
            <p className="text-2xl inline-block">
              <FaCaretDown />
            </p>
            Xem ngọc
          </button>
        </div>
        <div className="text-3xl font-bold text-red-700">
          {data.price.toLocaleString()}₫{" "}
          <span className="line-through text-gray-500 text-base ml-2">
            {data.discount &&
              Math.ceil(
                data.price / (1 - data.discount / 100)
              ).toLocaleString()}
          </span>{" "}
          <span className="text-sm bg-red-700 text-white px-2 py-0.5 rounded">
            - {data.discount}%
          </span>
        </div>

        <button
          onClick={() => payment()}
          className="bg-[#101828] text-white w-full py-4 rounded font-semibold hover:bg-red-700 cursor-pointer"
        >
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
        close={() => {
          setOpen(false);
          setImages([]);
        }}
        images={images}
      />
    </div>
  );
};

export default ProductDetail;
