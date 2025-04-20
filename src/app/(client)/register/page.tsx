"use client";
import { authAPI } from "@/api/auth";
import AuthForm from "@/components/client/authForm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      const { data } = await authAPI.register(values);
      console.log(data);
      return;
      Swal.fire({
        icon: "success",
        title: "Đăng ký thành công",
        showConfirmButton: true,
      });
      router.push("/verify");
    } catch ({ response }: any) {
      Swal.fire({
        icon: "error",
        title: "Đăng ký thất bại",
        text: response?.data?.message || "Lỗi không xác định",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm type="register" onSubmit={handleRegister} loading={loading} />
  );
};

export default RegisterPage;
