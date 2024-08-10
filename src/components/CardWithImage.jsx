import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const CardWithImage = ({ image, title, description }) => {
  return (
    <Card
      hoverable
      style={{ width: 220 }}
      cover={<img alt="example" src={image} />}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

CardWithImage.defaultProps = {
  image: "plant.jpg",
};

export default CardWithImage;
