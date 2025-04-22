import React from "react";
import { Modal, Avatar, Typography, Descriptions } from "antd";

const { Title } = Typography;

interface UserInfoModalProps {
  visible: boolean;
  onClose: () => void;
  user?: TUsersType;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  visible,
  onClose,
  user,
}) => {
  if (!user) return;
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      title="Thông tin người dùng"
    >
      <div className="flex flex-col items-center text-center">
        <Avatar size={100} src={user.avatar} alt={user.username} />
        <Title level={4} className="mt-4">
          {user.username}
        </Title>

        <Descriptions column={1} size="small" className="mt-2">
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          {user.coin && (
            <Descriptions.Item label="coin">
              <span className="text-red-500">
                ${user.coin.toLocaleString("vi-vn")}
              </span>
            </Descriptions.Item>
          )}
          {user.role && (
            <Descriptions.Item label="Vai trò">
              {user.role === "admin" ? "admin" : "Người dùng"}
            </Descriptions.Item>
          )}
          {user.status && (
            <Descriptions.Item label="Trạng thái tài hoản">
              {user.status ? "Hoạt động" : "Vô hiệu khóa"}
            </Descriptions.Item>
          )}
          {user.isVerified && (
            <Descriptions.Item label="Xác thực">
              {user.isVerified ? "Đã xác thực" : "Chưa xác thực"}
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>
    </Modal>
  );
};

export default UserInfoModal;
