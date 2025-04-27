"use client";
import React, { useRef, useState } from "react";
import { Input, Button, Typography, Space, message as antdMessage } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { authAPI } from "@/service/auth";
import ResendCodeButton from "@/components/client/reSendCode";
import Swal from "sweetalert2";

const { Title } = Typography;

const VerifyCodeAntd = () => {
  const [codeDigits, setCodeDigits] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  React.useEffect(() => {
    if (!email) {
      router.push("/dang-ky");
    }
  }, [email]);

  const handleChange = (value: string, index: number) => {
    const newDigits = [...codeDigits];

    if (/^[0-9]$/.test(value)) {
      newDigits[index] = value;
      setCodeDigits(newDigits);

      // Focus tiếp theo nếu có
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    } else {
      newDigits[index] = "";
      setCodeDigits(newDigits);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (codeDigits[index]) {
        const newDigits = [...codeDigits];
        newDigits[index] = "";
        setCodeDigits(newDigits);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    var code = codeDigits.join("");

    if (code.length !== 6) {
      setError("Vui lòng nhập đầy đủ 6 chữ số.");
      return;
    }
    if (!email) return setError("Email không hợp lệ.");
    try {
      setLoading(true);
      //call api
      const { data } = await authAPI.verify({ email, code: Number(code) });
      Swal.fire({
        title: data?.message,
        icon: "success",
        draggable: true,
      });
      setError("");
      router.push("/dang-nhap");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Xác thực thất bại.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const onResend = async () => {
    try {
      if (!email) return setError("Email không hợp lệ.");
      const { data } = await authAPI.reSendCodeVerify({ email });
      Swal.fire({
        title: data?.message,
        icon: "success",
        draggable: true,
      });
    } catch ({ response }: any) {
      const msg = response?.data?.message;
      setError(msg);
    }
  };
  return (
    <Space
      direction="vertical"
      align="center"
      style={{ width: "100%", padding: 20 }}
      className="my-10"
    >
      <Title level={4}>Nhập mã xác thực (6 số)</Title>

      <Space>
        {codeDigits.map((digit, i) => (
          <Input
            key={i}
            maxLength={1}
            value={digit}
            ref={(el: any) => (inputsRef.current[i] = el)}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            style={{
              width: 50,
              height: 50,
              textAlign: "center",
              fontSize: 24,
            }}
          />
        ))}
      </Space>
      <ResendCodeButton onResend={onResend} />
      <Button
        type="primary"
        loading={loading}
        onClick={handleSubmit}
        style={{ marginTop: 16 }}
      >
        Xác nhận
      </Button>

      {error && <div style={{ color: "red" }}>{error}</div>}
    </Space>
  );
};

export default VerifyCodeAntd;
