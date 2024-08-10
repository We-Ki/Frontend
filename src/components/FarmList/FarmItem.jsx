import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const FarmItem = ({ image, title, description }) => {
  return (
    <Card
      hoverable
      style={{ width: "19%" }}
      cover={<img alt="example" src={image} />}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

FarmItem.defaultProps = {
  image: "plant.jpg",
};

export default FarmItem;
