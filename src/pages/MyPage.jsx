import React, { useContext, useEffect, useState } from "react";
import { Row, Col, List, Divider, Card, Avatar, Button } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { gray } from "@ant-design/colors";
import ContentHeader from "../components/ContentHeader";
import { IsLoginContext } from "../contexts/IsLoginContext";
import { useNavigate } from "react-router-dom";

const point = [
  "물주기 - 1번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
  "물주기 - 2번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
  "물주기 - 3번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
  "물주기 - 4번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
  "물주기 - 5번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
];

const mydata = ["기본 정보", "주소"];

const MyPage = () => {
  const [myInfo, setMyInfo] = useState([]);

  const navigate = useNavigate();

  const { setIsLogin } = useContext(IsLoginContext);

  useEffect(() => {
    const fetchFarms = () => {
      fetch(`http://${process.env.REACT_APP_API_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setMyInfo(data.message);
        })
        .catch((err) => console.error("Fetching error:", err));
    };

    fetchFarms();
  }, []);
  return (
    <>
      <ContentHeader title={"마이"} sub={"포인트를 모으고\n농작물을 키우자!"} />
      <div
        style={{
          marginBottom: "20px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ marginRight: "20px" }}
          />
          <b>{myInfo.name}</b>
        </div>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            setIsLogin(false);
            window.location.reload();
          }}
        >
          로그아웃
        </Button>
      </div>
      <Row gutter={10}>
        <Col span={12}>
          <Card style={cardStyle}>
            <b>회원구분</b>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={cardStyle}>
            <b>{myInfo.userGroup}</b>
          </Card>
        </Col>
      </Row>
      <Divider
        orientation="left"
        style={{ marginBottom: "0px", textAlign: "left", color: gray[7] }}
      >
        <h5>
          <IdcardOutlined style={{ marginRight: "5px" }} />내 정보
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
      <Card style={bigCardStyle}>
        <b>내 포인트</b>
        <br />
        <h2>{myInfo.point}포인트</h2>
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
};

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
  height: "100px", // 카드 높이를 원하는 크기로 설정
  textAlign: "left",
  color: gray[7],
  fontSize: "10px",
};

export default MyPage;
