"use client";
import { authAPI } from "@/service/auth";
import AuthForm from "@/components/client/authForm";
import { useAuth } from "@/hooks/useAuth";
import { AuthType } from "@/types/auth";
import { setToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mutateUser } = useAuth();
  const handleLogin = async (values: AuthType) => {
    setLoading(true);
    try {
      const {data} = await authAPI.login(values);
      setToken(data.token); //  Lưu token
      await mutateUser(); // cập nhật user info
      Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/")
    } catch ({response}:any) {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại",
        text: response?.data?.message || "Lỗi không xác định",
      });
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} loading={loading} />;
};

export default LoginPage;
