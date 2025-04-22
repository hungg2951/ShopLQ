"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";
import axios from "axios";
import UploadImageGroup from "./UploadImageGroup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { dataRanks, typeAccount } from "@/utils/dataAccount";
import { accountAPI } from "@/api/account";

interface AccountFormProps {
  defaultValues?: any; // dữ liệu cũ (nếu có)
  isEdit?: boolean; // xác định xem là create hay update
}

const uploadToCloudinary = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Upload thất bại");
    return data.secure_url;
  } catch (err) {
    console.error("Upload thất bại:", err);
    throw err;
  }
};

const uploadImageArray = async (files: any[]) => {
  return Promise.all(
    files.map(async (item: any) => {
      const file = item.originFileObj || item.url;
      return typeof file === "string" ? file : await uploadToCloudinary(file);
    })
  );
};

const AccountForm: React.FC<AccountFormProps> = ({ defaultValues, isEdit }) => {
  const [loading, setloading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Khi có dữ liệu mặc định (update), fill vào form
  useEffect(() => {
    if (isEdit && defaultValues) {
      form.setFieldsValue(defaultValues);
    }
  }, [isEdit, defaultValues, form]);

  const onFinish = async (values: any) => {
    setloading(true);
    try {
      if (!values.image || !values.image[0]?.originFileObj) {
        console.log(values);
        setloading(false);
        return Swal.fire({
          icon: "error",
          title: "Lỗi upload ảnh",
          showConfirmButton: true,
        });
      }
      // Upload ảnh
      const image = await uploadToCloudinary(values.image[0].originFileObj);
      const bagImages = await uploadImageArray(values.bagImages || []);
      const skinImages = await uploadImageArray(values.skinImages || []);
      const champImages = await uploadImageArray(values.champImages || []);
      const runeImages = await uploadImageArray(values.runeImages || []);

      // Payload gửi lên backend
      const payload = {
        ...values,
        price: Number(values.price) || 0,
        gold: Number(values.gold) || 0,
        winRate: Number(values.winRate) || 0,
        reputation: Number(values.reputation) || 0,
        image,
        bagImages,
        skinImages,
        champImages,
        runeImages,
      };

      if (isEdit) {
        setloading(false);
        // Nếu là update thì gọi API PATCH
        console.log(payload);
      } else {
        // Nếu là create thì gọi API POST
        await accountAPI.createAccount(payload)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Tạo tài khoản thành công!",
            showConfirmButton: false,
            timer: 1500,
          })
          form.resetFields();
          // if (response && mounted) {
          //   router.push("/admin/account"); // Chuyển hướng sau khi thành công
          // }
        })
        .catch(({response}) => {
          Swal.fire({
            icon: "error",
            title: response?.data.mesage,
            showConfirmButton: true,
          });
        })
        .finally(() => setloading(false));
      }
    } catch (error:any) {
      setloading(false);
      console.error(error);
      Swal.fire({
        icon: "error",
        title: error?.response?.data.message,
        showConfirmButton: true,
      });
    }
  };
  if (!mounted) return <div>Loading...</div>;
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[{ required: true, message: "Vui lòng không để trống!" }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="plainPassword"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng không để trống!" }]}
        >
          <Input type="password"/>
        </Form.Item>
        <Form.Item
          name="type"
          label="Loại tài khoản"
          rules={[{ required: true, message: "Vui lòng chọn loại tài khoản!" }]}
        >
          <Select
            placeholder="Chọn loại tài khoản"
            optionFilterProp="label"
            options={typeAccount.map((item: any) => ({ value: item }))}
          />
        </Form.Item>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <Form.Item
          name="rank"
          label="Rank hiện tại"
          rules={[{ required: true, message: "Vui lòng chọn mức rank!" }]}
        >
          <Select
            placeholder="Chọn mức rank hiện tại"
            optionFilterProp="label"
            options={dataRanks.map((item: any) => ({ value: item }))}
          />
        </Form.Item>
        <Form.Item
          name="highestRank"
          label="Rank cao nhất"
          rules={[{ required: true, message: "Vui lòng chọn mức rank!" }]}
        >
          <Select
            placeholder="Chọn mức rank cao nhất"
            optionFilterProp="label"
            options={dataRanks.map((item: any) => ({ value: item }))}
          />
        </Form.Item>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
        <Form.Item
          name="price"
          label="Giá bán"
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            formatter={(value: any) =>
              value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
            }
            parser={(value) => value?.replace(/\./g, "") || ""}
          />
        </Form.Item>
        <Form.Item name="discount" label="Giảm giá (%)">
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>
        <Form.Item name="champions" label="Số tướng">
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>
        <Form.Item name="skins" label="Số skin">
          <InputNumber style={{ width: "100%" }} min={0} className="w-full" />
        </Form.Item>
        <Form.Item name="runes" label="Ngọc cấp III">
          <InputNumber style={{ width: "100%" }} min={0} className="w-full" />
        </Form.Item>
        <Form.Item name="winRate" label="Tỷ lệ thắng (%)">
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            max={100}
            className="w-full"
          />
        </Form.Item>
        <Form.Item name="renameCards" label="Thẻ đổi tên">
          <InputNumber style={{ width: "100%" }} min={0} className="w-full" />
        </Form.Item>
        <Form.Item name="gold" label="Vàng">
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            formatter={(value: any) =>
              value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
            }
            parser={(value) => value?.replace(/\./g, "") || ""}
          />
        </Form.Item>
        <Form.Item name="matches" label="Số trận">
        <InputNumber
            style={{ width: "100%" }}
            min={0}
            formatter={(value: any) =>
              value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
            }
            parser={(value) => value?.replace(/\./g, "") || ""}
          />
        </Form.Item>
        <Form.Item name="reputation" label="Uy tín">
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            max={100}
            className="w-full"
          />
        </Form.Item>
        <Form.Item name="impressions" label="Dấu ấn">
          <InputNumber style={{ width: "100%" }} min={0} className="w-full" />
        </Form.Item>
      </div>

      <UploadImageGroup name="image" label="Ảnh đại diện" maxCount={1} />
      <UploadImageGroup name="bagImages" label="Ảnh túi đồ" />
      <UploadImageGroup name="skinImages" label="Ảnh trang phục" />
      <UploadImageGroup name="champImages" label="Ảnh tướng" />
      <UploadImageGroup name="runeImages" label="Ảnh ngọc" />

      <Form.Item name="description" label="Mô tả chi tiết">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item name="note" label="Ghi chú">
        <Input.TextArea rows={2} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading}>
        {isEdit ? "Cập nhật" : "Tạo mới"}
      </Button>
    </Form>
  );
};

export default AccountForm;
