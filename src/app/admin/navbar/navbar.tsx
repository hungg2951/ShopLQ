import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { FaGamepad } from "react-icons/fa";

export const itemsList = [
  {
    name: "Dashboard",
    key: "1",
    icon: <PieChartOutlined />,
    path: "/admin",
  },
  {
    name: "User",
    key: "2",
    icon: <UserOutlined />,
    path: "/admin/users",
  },
  {
    name: "Account",
    key: "3",
    icon: <FaGamepad />,
    path: "/admin/account",
  },
];
