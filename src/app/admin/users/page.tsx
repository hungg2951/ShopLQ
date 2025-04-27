"use client";

import { fetcher } from "@/lib/fetcher";
import { Table, Tag, Input, Button, Space, Switch } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import useSWR, { mutate } from "swr";
import React, { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { userAPI } from "@/service/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import UserInfoModal from "./modalInfoUser";

type DataIndex = keyof TUsersType;

const UsersTable = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<TUsersType[]>(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/users",
    fetcher
  );

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<TUsersType>();

  const searchInput = useRef(null);
  const router = useRouter();

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const toggleUpdateUser = async (values: TUserUpdate) => {
    try {
      Swal.fire({
        title: "Bạn có chắc muốn lưu chỉnh sửa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Lưu chỉnh sửa!",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Thành công!",
            text: "Lưu chỉnh sửa thành công.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          await userAPI.updateUser(values);
          mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`);
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi khi cập nhật trạng thái");
    }
  };

  const openModalInfoUser = (value: TUsersType) => {
    setUser(value);
    setOpen(true);
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<TUsersType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
            }}
            size="small"
            style={{ width: 90 }}
          >
            Xóa
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
  });

  React.useEffect(() => {
    if (error) {
      Swal.fire({
        title: error?.response.data.message,
        icon: "error",
        draggable: true,
      });
    }
  }, [error]);

  if (isLoading) return <div>Loading...</div>;
  if (!users) return null;

  const columns: ColumnsType<TUsersType> = [
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Coin",
      dataIndex: "coin",
      key: "coin",
      sorter: (a, b) => a.coin - b.coin,
      render: (item) => (
        <div className="text-red-500">${item.toLocaleString("vi-VN")}</div>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      filters: [
        { text: "Hoạt động", value: true },
        { text: "Vô hiệu hóa", value: false },
      ],
      render: (_, record) => (
        <Switch
          checked={record.status}
          onChange={() =>
            toggleUpdateUser({
              id: record._id,
              status: !record.status,
            })
          }
          checkedChildren="Hoạt động"
          unCheckedChildren="Vô hiệu hóa"
          style={{
            transition: "all 0.3s ease",
          }}
        />
      ),
    },
    {
      title: "Xác thực",
      dataIndex: "isVerified",
      key: "isVerified",
      filters: [
        { text: "Đã xác thực", value: true },
        { text: "Chưa xác thực", value: false },
      ],
      onFilter: (value, record) => record.isVerified === value,
      render: (val: boolean, record) =>
        record.isVerified ? (
          <Tag color="green">Đã xác thực</Tag>
        ) : (
          <Switch
            checked={record.isVerified}
            onChange={() =>
              toggleUpdateUser({
                id: record._id,
                isVerified: !record.isVerified,
              })
            }
            checkedChildren="Đã xác thực"
            unCheckedChildren="Chưa xác thực"
          />
        ),
    },
    {
      title: "Chi tiết",
      key: "_id",
      width: 20,
      render: (_, record) => (
        <Button
          className="flex justify-end w-fit"
          onClick={() => openModalInfoUser(record)}
        >
          <IoIosInformationCircleOutline />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-center mb-10 text-xl font-bold">Dánh sách tài khoản SHOP LQ</h2>
      <Table
        loading={isLoading}
        rowKey="_id"
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 10 }}
      />
      <UserInfoModal
        visible={open}
        onClose={() => {
          setOpen(false);
          setUser(undefined);
        }}
        user={user}
      />
    </div>
  );
};

export default UsersTable;
