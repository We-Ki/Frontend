import React from "react";
import { Row, Col } from "antd";

const Menu = () => (
  <>
    <Row style={{ textAlign: "left" }}>
      <Col span={4}>
        <h1>전체</h1>
      </Col>
      <Col span={20}></Col>
    </Row>
    <Row style={{ marginBottom: "30px", textAlign: "left" }}>
      <Col span={8}>
        <h3>
          메뉴 <br /> 바로 가기{" "}
        </h3>
      </Col>
      <Col span={16}></Col>
    </Row>
  </>
);

export default Menu;
