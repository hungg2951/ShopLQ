// components/UploadImageGroup.tsx
import { Upload, Form } from "antd";
import type { UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";

interface UploadImageGroupProps extends UploadProps {
  label: string;
  name: string;
  maxCount?: number;
}

const UploadImageGroup: React.FC<UploadImageGroupProps> = ({
  label,
  name,
  maxCount,
  ...restProps
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      valuePropName="fileList"
      getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
    >
      <Upload
        listType="picture-card"
        maxCount={maxCount}
        multiple={maxCount !== 1}
        beforeUpload={() => false}
        {...restProps}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </Form.Item>
  );
};

export default UploadImageGroup;
