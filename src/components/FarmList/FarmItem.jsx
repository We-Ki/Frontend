import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom"; // 경로 이동을 위한 useNavigate 훅

const { Meta } = Card;

const FarmItem = ({ image = "plant.jpg", title, description, farmId }) => {
  const navigate = useNavigate();

  // 클릭 시 해당 농장의 관리 페이지로 이동
  const handleClick = () => {
    navigate(`/manage/${farmId}`); // farmId를 URL에 포함
  };

  return (
    <Card
      hoverable
      style={{ width: "19%" }}
      cover={<img alt="example" src={image} />}
      onClick={handleClick} // 클릭 이벤트 추가
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default FarmItem;
