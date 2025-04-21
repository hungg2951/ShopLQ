"use client";

import { fetcher } from "@/lib/fetcher";
import { UsersType } from "@/types/auth";
import { Table, Tag, Input, Button, Space, message, Switch } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import useSWR, { mutate } from "swr";
import { useState, useRef } from "react";
import {  SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { userAPI } from "@/api/user";
import { toast } from "react-toastify";

type DataIndex = keyof UsersType;

const UsersTable = () => {
  const { data: users, isLoading } = useSWR<UsersType[]>(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/users",
    fetcher
  );

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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
      await userAPI.updateUser(values);
      await mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`);
      toast.success("Chỉnh sửa thành công")
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi khi cập nhật trạng thái");
    }
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<UsersType> => ({
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

  if (isLoading) return <div>Loading...</div>;
  if (!users) return null;

  const columns: ColumnsType<UsersType> = [
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
      title: "Hành động",
      key: "_id",
      width: 20,
      render: (_, record) => (
        <Button className="flex justify-end w-fit">
          <IoIosInformationCircleOutline />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Table
        loading={isLoading}
        rowKey="id"
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default UsersTable;
