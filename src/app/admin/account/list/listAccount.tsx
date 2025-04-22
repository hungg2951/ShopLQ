"use client";

import { Input, Table, Button, Space } from "antd";
import type {
  ColumnsType,
  TablePaginationConfig,
  ColumnType,
} from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import useSWR from "swr";
import { useState } from "react";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { IoAddSharp } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import AccountModal from "./modalInfoAccount";

interface ApiResponse {
  total: number;
  page: number;
  totalPages: number;
  accounts: TAccount[];
}

export default function AccountTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [codeFilter, setCodeFilter] = useState(""); // thực sự lọc server-side
  const [searchText, setSearchText] = useState(""); // value của input
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<TAccount>();

  const router = useRouter();
  // Build query string có cả codeFilter nếu tồn tại
  const query = new URLSearchParams({
    page: String(currentPage),
    ...(codeFilter ? { code: codeFilter } : {}),
  }).toString();

  // SWR sẽ tự động refetch khi currentPage hoặc codeFilter thay đổi
  const { data, isLoading } = useSWR<ApiResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts?${query}`,
    fetcher
  );

  //
  const onRowClick = (record: TAccount) => {
    setSelectedAccount(record);
    setVisible(true);
  };

  //
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const getColumnSearchProps = (
    dataIndex: keyof TAccount
  ): ColumnType<TAccount> => ({
    filterDropdown: (_props: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm ${dataIndex}`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={() => {
            setCodeFilter(searchText.trim());
            setCurrentPage(1);
            setFilterDropdownVisible(false);
          }}
          style={{ marginBottom: 8, display: "block" }}
          autoFocus
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            onClick={() => {
              setCodeFilter(searchText.trim());
              setCurrentPage(1);
              setFilterDropdownVisible(false);
            }}
          >
            Tìm
          </Button>
          <Button
            size="small"
            onClick={() => {
              setSearchText("");
              setCodeFilter("");
              setCurrentPage(1);
              setFilterDropdownVisible(false);
            }}
          >
            Xóa
          </Button>
        </Space>
      </div>
    ),
    filterIcon: () => (
      <SearchOutlined style={{ color: codeFilter ? "#1890ff" : undefined }} />
    ),
    filterDropdownProps: {
      open: filterDropdownVisible,
      onOpenChange: (open) => {
        setFilterDropdownVisible(open);
        if (open) {
          setSearchText(codeFilter);
        }
      },
    },
  });

  const columns: ColumnsType<TAccount> = [
    {
      title: "Mã tài khoản",
      dataIndex: "code",
      key: "code",
      ...getColumnSearchProps("code"),
    },
    {
      title: "Người mua",
      dataIndex: "buyerId",
      key: "buyerId",
      render: (buyerId) => buyerId || "Chưa bán",
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <p className="text-red-500">${price.toLocaleString()}</p>
      ),
    },
    {
      title: "Hành động",
      key: "_id",
      width: 150,
      render: (_, record) => (
        <div className="flex gap-1">
          <Button onClick={() => onRowClick(record)}>
            <IoIosInformationCircleOutline />
          </Button>
          <Button
            onClick={() =>
              router.push(`/admin/account/edit?code=${record.code}`)
            }
          >
            <FiEdit />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-3">
        Danh sách tài khoản game của SHOP LQ
      </h2>
      <div className="flex justify-end w-full mb-3">
        <Button
          type="primary"
          onClick={() => router.push("/admin/account/create")}
        >
          <IoAddSharp />
          Thêm tài khoản
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data?.accounts || []}
        rowKey="code"
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: data?.total || 0,
        }}
        onChange={handleTableChange}
      />

      <AccountModal
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setSelectedAccount(undefined);
        }}
        account={selectedAccount}
      />
    </div>
  );
}
