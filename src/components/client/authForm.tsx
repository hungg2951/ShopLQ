import React from "react";
import { Form, Input, Button, Typography } from "antd";
import Link from "next/link";

const { Title } = Typography;

type AuthFormProps = {
  type: "login" | "register";
  onSubmit: (values: any) => void;
  loading?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  loading = false,
}) => {
  const isLogin = type === "login";

  return (
    <div
      style={{ maxWidth: 500, paddingTop: "2rem" }}
      className="border-gray-300 rounded-lg shadow-md p-6 bg-white my-20 mx-auto"
    >
      <Title level={2} style={{ textAlign: "center" }}>
        {isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}
      </Title>

      <Form layout="vertical" onFinish={onSubmit} autoComplete="off">
        <Form.Item
          label="Tên người dùng"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
        >
          <Input />
        </Form.Item>

        {!isLogin && (
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>

        {!isLogin && (
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu không khớp!");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </Button>
        </Form.Item>
        {isLogin ? (
          <p>
            Bạn chưa có tài khoản?{" "}
            <Link href={"/dang-ky"}>Đăng ký tài khoản</Link>
          </p>
        ) : (
          <p>
            Bạn đã có tài khoản? <Link href={"/dang-nhap"}>Đăng nhập</Link>
          </p>
        )}
      </Form>
    </div>
  );
};

export default AuthForm;
