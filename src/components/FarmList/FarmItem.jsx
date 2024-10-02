import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const FarmItem = ({ image = "plant.jpg", title, description, farmId }) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      style={{ width: "19%" }}
      cover={<img alt="example" src={image} />}
      onClick={() => {
        navigate(`/manage/${farmId}`);
      }} // 클릭 이벤트 추가
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default FarmItem;
