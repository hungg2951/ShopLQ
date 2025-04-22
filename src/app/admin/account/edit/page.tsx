"use client";

import AccountForm from "@/components/admin/accountForm";
import { fetcher } from "@/lib/fetcher";
import { SwlNotify } from "@/utils/sweetAlert";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

interface Props {}

const UpdateAccount = (props: Props) => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  if (!code) {
    return <div>Không tìm thấy mã tài khoản</div>;
  }

  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/${code}`,
    fetcher
  );
  const { data: infoAccount, error: errorInfo } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/info-account-by-id/${code}`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;

  if (error || !data) {
    SwlNotify({
      icon: "error",
      title: "Lỗi khi tải dữ liệu tài khoản",
      showConfirm: true,
    });
    return;
  }
  if (errorInfo) {
    SwlNotify({
      icon: "error",
      title: errorInfo.response?.data?.message || "Lỗi không xác định",
      showConfirm: true,
    });
    return;
  }
  const dataUpdate = {...data,...infoAccount?.loginInfo,idAccount:data._id,idInfoAcc:infoAccount?.loginInfo?._id}
  return (
    <div>
      <AccountForm isEdit={true} defaultValues={dataUpdate} />
    </div>
  );
};

export default UpdateAccount;
