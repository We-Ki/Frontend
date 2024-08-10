import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const Home = () => (
  <>
    <h1>홈</h1>
    <h3>
      한눈에 관리하는
      <br /> 나만의 농장
    </h3>
    <div style={{ display: "flex", gap: "16px", marginBottom: "10px" }}>
      <Card
        hoverable
        style={{ width: 220, height: 200 }}
        cover={<img alt="example" src="plant.jpg" />}
      >
        <Meta title="1번 구역" description="상추 재배" />
      </Card>
      <Card
        hoverable
        style={{ width: 220, height: 200 }}
        cover={<img alt="example" src="plant.jpg" />}
      >
        <Meta title="2번 구역" description="상추 재배" />
      </Card>
    </div>
    <div style={{ display: "flex", gap: "16px", marginBottom: "10px" }}>
      <Card
        hoverable
        style={{ width: 220, height: 200 }}
        cover={<img alt="example" src="plant.jpg" />}
      >
        <Meta title="3번 구역" description="상추 재배" />
      </Card>
      <Card
        hoverable
        style={{ width: 220, height: 200 }}
        cover={<img alt="example" src="plant.jpg" />}
      >
        <Meta title="4번 구역" description="상추 재배" />
      </Card>
    </div>
    <div style={{ display: "flex", gap: "16px", marginBottom: "10px" }}>
      <Card
        hoverable
        style={{ width: 220, height: 200 }}
        cover={<img alt="example" src="plant.jpg" />}
      >
        <Meta title="5번 구역" description="상추 재배" />
      </Card>
      <Card
        hoverable
        style={{ width: 220, height: 200 }}
        cover={<img alt="example" src="plant.jpg" />}
      >
        <Meta title="6번 구역" description="상추 재배" />
      </Card>
    </div>
  </>
);

export default Home;
