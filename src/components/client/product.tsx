export default function AccCard({
  code,
  rank,
  price,
  discount,
  matches,
  champions,
  skins,
  runes,
  image,
  isSold,
}: TAccount) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-2 relative group transition-all duration-300">
      <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold absolute rounded-br-xl z-10">
        Giảm {discount}%
      </div>
      <div className="py-1 absolute z-10 top-2/5">
        <p className="bg-black w-fit p-1 my-1 border border-white text-[10px] rounded-br-lg rounded-tr-lg">
          TLT: <span>56%</span>
        </p>
        <p className="bg-black w-fit p-1 my-1 border border-white text-[10px] rounded-br-lg rounded-tr-lg">
          Thẻ đổi tên: <span>32</span>
        </p>
        <p className="text-xs w-fit text-white bg-red-600 border border-white rounded-br-lg rounded-tr-lg p-1">
          Số trận: {matches?.toLocaleString("vi-VN")}
        </p>
      </div>

      {/* Placeholder hình ảnh */}
      <div className="bg-gray-200">
        <img
          className="group-hover:scale-105 transition-all duration-300"
          src={image}
          alt=""
        />
      </div>

      <div className="p-4 space-y-2 ">
        <h3 className="font-semibold text-lg text-gray-800 border-b border-gray-200 py-2">
          LIÊN QUÂN {code}
        </h3>
        <p className="text-xs text-black">
          Rank hiện tại:{" "}
          <span className={`font-bold text-pink-500`}>{rank}</span>
        </p>
        <p className="text-xs text-black">
          Tướng: {champions} • Skin: {skins} • Ngọc III: {runes}
        </p>

        {!isSold ? (
          <div className="text-red-600 font-semibold text-lg">
            {price.toLocaleString("vi-VN")}đ
            <span className="text-gray-400 line-through text-sm ml-2">
              {discount &&
                Math.ceil(price / (1 - discount / 100)).toLocaleString()}
              đ
            </span>
          </div>
        ) : (
          <div className="text-red-500 font-bold italic">Đã bán</div>
        )}

        <button className="bg-black text-white px-4 py-1 text-sm rounded hover:bg-gray-800">
          XEM CHI TIẾT
        </button>
      </div>
    </div>
  );
}
