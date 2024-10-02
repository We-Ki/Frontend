import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BackButton = ({ label, url }) => {
  const navigate = useNavigate();
  return (
    <Button
      size="large"
      icon={<ArrowLeftOutlined />}
      type="text"
      onClick={() => {
        navigate(url);
      }}
    >
      {label}
    </Button>
  );
};

export default BackButton;
