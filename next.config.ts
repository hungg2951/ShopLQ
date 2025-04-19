import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/lich-su-nap',         // URL mà người dùng sẽ truy cập
        destination: '/historyDeposit',     // URL mà Next.js sẽ render nội dung từ
      },
      {
        source: '/lich-su-mua',         // URL mà người dùng sẽ truy cập
        destination: '/historyBuyAccount',     // URL mà Next.js sẽ render nội dung từ
      },
      {
        source: '/nap-coin',         // URL mà người dùng sẽ truy cập
        destination: '/deposit',     // URL mà Next.js sẽ render nội dung từ
      },
    ];
  },
};

export default nextConfig;
