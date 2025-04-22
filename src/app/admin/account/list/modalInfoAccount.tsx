'use client';

import { Modal, Descriptions, Tag } from 'antd';

interface AccountModalProps {
  visible: boolean;
  onCancel: () => void;
  account?: TAccount;
}

export default function AccountModal({ visible, onCancel, account }: AccountModalProps) {
  if (!account) return;

  return (
    <Modal
      title={`Chi tiết tài khoản ${account.code}`}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Descriptions
        column={1}
        bordered
        size="small"
        styles={{
          label: { width: 150, fontWeight: 500 }, // Thay thế labelStyle
          content: {}, // Thay thế contentStyle
        }}
      >
        <Descriptions.Item label="Mã">{account.code}</Descriptions.Item>
        <Descriptions.Item label="Game">{account.game || 'Liên Quân'}</Descriptions.Item>

        <Descriptions.Item label="Giá bán">
          {account.price.toLocaleString()} đ
        </Descriptions.Item>
        <Descriptions.Item label="Giảm giá">
          {account.discount ?? 0}%
        </Descriptions.Item>

        <Descriptions.Item label="Trạng thái">
          {account.isSold ? <Tag color="red">Đã bán</Tag> : <Tag color="green">Chưa bán</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="Người mua">
          {account.buyerId || '–'}
        </Descriptions.Item>

        <Descriptions.Item label="Rank hiện tại">
          {account.rank || '–'}
        </Descriptions.Item>
        <Descriptions.Item label="Rank cao nhất">
          {account.highestRank || '–'}
        </Descriptions.Item>
        <Descriptions.Item label="Số tướng">
          {account.champions ?? 0}
        </Descriptions.Item>
        <Descriptions.Item label="Số skin">
          {account.skins ?? 0}
        </Descriptions.Item>
        <Descriptions.Item label="Ngọc cấp III">
          {account.runes ?? 0}
        </Descriptions.Item>
        <Descriptions.Item label="Tỷ lệ thắng">
          {(account.winRate ?? 0).toFixed(2)}%
        </Descriptions.Item>
        <Descriptions.Item label="Thẻ đổi tên">
          {account.renameCards ?? 0}
        </Descriptions.Item>
        <Descriptions.Item label="Vàng">
          {account.gold?.toLocaleString()} đ
        </Descriptions.Item>
        <Descriptions.Item label="Số trận">
          {account.matches ?? 0}
        </Descriptions.Item>
        <Descriptions.Item label="Uy tín">
          {(account.reputation ?? 0).toFixed(0)}%
        </Descriptions.Item>
        <Descriptions.Item label="Dấu ấn">
          {account.impressions ?? 0}
        </Descriptions.Item>

        {/* Cuối cùng mới đến description và note */}
        <Descriptions.Item label="Mô tả">
          {account.description || '–'}
        </Descriptions.Item>
        <Descriptions.Item label="Ghi chú">
          {account.note || '–'}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
