import React from "react";
import { Modal } from "antd";
interface Props {
  open: boolean;
  close: () => void;
  title: string;
  images: string[];
}

const ModalInfoAccount = ({ open, close, title, images }: Props) => {
  return (
    <div className="text-center">
      <Modal width={800} title={title} open={open} onCancel={close} footer={null}>
        {images.length > 0
          ? images.map((image) => <img className="mb-3" src={image} alt="" />)
          : ""}
      </Modal>
    </div>
  );
};

export default ModalInfoAccount;
