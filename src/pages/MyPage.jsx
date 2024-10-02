import React, { useContext, useEffect, useState } from "react";
import { List, Divider, Card, Avatar, Button } from "antd";
import { UserOutlined, DollarOutlined } from "@ant-design/icons";
import { gray } from "@ant-design/colors";
import ContentHeader from "../components/ContentHeader";
import { IsLoginContext } from "../contexts/IsLoginContext";

const point = [
  "물주기 - 1번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
  "물주기 - 2번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
  "물주기 - 3번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
  "물주기 - 4번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
  "물주기 - 5번 구역 물주기. 토양 습도 24%에서 27%로 상승!",
];

const MyPage = () => {
  const [myInfo, setMyInfo] = useState({});

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
      <ContentHeader title={"마이"} sub={"농작물을 키우고\n포인트를 모으자!"} />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ marginRight: "20px" }}
          />
          <div style={{ display: "inline-block" }}>
            <b>
              <span style={{ margin: "0", fontSize: "2em" }}>
                {myInfo.name}
              </span>
              <br />
              <span style={{ color: gray[5] }}>
                {myInfo.userGroup === "user" ? "사용자" : "농장주"}
              </span>
            </b>
          </div>
        </div>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userUUID");
            setIsLogin(false);
          }}
        >
          로그아웃
        </Button>
      </div>
      <Card style={{ ...bigCardStyle, marginTop: "30px", fontSize: "1.25em" }}>
        내 포인트
        <br />
        <b>{myInfo.point} 포인트</b>
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
