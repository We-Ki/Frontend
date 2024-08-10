import React from "react";
import { Row, Col, Divider, List } from "antd";
import { VideoCameraOutlined, LineChartOutlined } from "@ant-design/icons";
import { gray } from "@ant-design/colors";

const data = ["1번 구역", "2번 구역", "3번 구역", "4번 구역", "5번 구역"];

const Analytics = () => (
  <>
    <Row style={{ textAlign: "left" }}>
      <Col span={4}>
        <h1>분석</h1>
      </Col>
      <Col span={20}></Col>
    </Row>
    <Row style={{ marginBottom: "-10px", textAlign: "left" }}>
      <Col span={8}>
        <h3>
          데이터 분석을 통한 <br /> 똑똑한 농장 관리
        </h3>
      </Col>
      <Col span={16}></Col>
    </Row>
    <Divider
      orientation="left"
      style={{ marginBottom: "0px", textAlign: "left", color: gray[7] }}
    >
      <h5>
        <VideoCameraOutlined style={{ marginRight: "5px" }} />
        실시간 카메라 보기
      </h5>
    </Divider>
    <List
      style={{ backgroundColor: "white", border: "none" }}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          style={{ fontWeight: "bold", color: gray[7], fontSize: "10px" }}
        >
          {item}
        </List.Item>
      )}
    />
    <Divider
      orientation="left"
      style={{ marginBottom: "0px", textAlign: "left", color: gray[7] }}
    >
      <h5>
        <LineChartOutlined style={{ marginRight: "5px" }} />
        데이터 분석 및 보고서
      </h5>
    </Divider>
    <List
      style={{ backgroundColor: "white", border: "none" }}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          style={{ fontWeight: "bold", color: gray[7], fontSize: "10px" }}
        >
          {item}
        </List.Item>
      )}
    />
  </>
);

export default Analytics;
