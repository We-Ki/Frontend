import React from "react";
import { Row, Col, List, Divider, Card, Avatar } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { gray } from "@ant-design/colors";
import ContentHeader from "../components/ContentHeader";

const point = [
  "물주기 - 1번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
  "물주기 - 2번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
  "물주기 - 3번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
  "물주기 - 4번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
  "물주기 - 5번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
];

const mydata = ["사용자명", "비밀번호", "비밀번호 확인", "이메일", "이름", "사용자 구분"];

const SignUp = () => (
  <>
    <ContentHeader title={"회원가입"} sub={"계정을 생성하고 \n 농장을 개설하거나 참여하세요"} />
    <Row style={{ marginBottom: "20px", textAlign: "left" }}>
      <Col span={4}>
        {/* <Avatar size={64} icon={<UserOutlined />} /> */}
      </Col>
      <Col span={4}>
        <br />
        {/* <b>김위키</b> */}
      </Col>
      <Col span={16}></Col>
    </Row>
    <Row gutter={10}>
      <Col span={12}>
        <Card style={cardStyle}>
          <b>회원구분</b>
        </Card>
      </Col>
      <Col span={12}>
        <Card style={cardStyle}>
          <b>일반</b>
        </Card>
      </Col>
    </Row>
    <Divider
      orientation="left"
      style={{ marginBottom: "0px", textAlign: "left", color: gray[7] }}
    >
      <h5>
        <IdcardOutlined style={{ marginRight: "5px" }} />내 정보 입력
      </h5>
    </Divider>
    <List
      style={{ backgroundColor: "white", border: "none" }}
      bordered
      dataSource={mydata}
      renderItem={(item) => (
        <List.Item
          style={{ fontWeight: "bold", color: gray[7], fontSize: "10px" }}
        >
          {item}
        </List.Item>
      )}
    />
    <div style={{ marginTop: "30px" }}></div>
    <Card style={cardStyle}>
      <b>회원가입</b>
    </Card>
    <Divider
      orientation="left"
      style={{ marginBottom: "0px", textAlign: "left", color: gray[7] }}
    >
      <h5>
        <DollarOutlined style={{ marginRight: "5px" }} />
        포인트 적립 내역
      </h5>
    </Divider>
    <List
      style={{ backgroundColor: "white", border: "none" }}
      bordered
      dataSource={point}
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

const cardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  height: "50px", // 카드 높이를 원하는 크기로 설정
  textAlign: "left",
  color: gray[7],
  fontSize: "10px",
};

const bigCardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
  height: "100px", // 카 드 높이를 원하는 크기로 설정
  textAlign: "left",
  color: gray[7],
  fontSize: "10px",
};

export default SignUp;
