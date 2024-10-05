import React, { useContext, useEffect, useState } from "react";
import { List, Divider, Card, Avatar, Button } from "antd";
import { UserOutlined, DollarOutlined } from "@ant-design/icons";
import { gray } from "@ant-design/colors";
import ContentHeader from "../components/ContentHeader";
import { IsLoginContext } from "../contexts/IsLoginContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [myInfo, setMyInfo] = useState({});
  const [wateringLogs, setWateringLogs] = useState([]); // 물주기 로그 상태 추가
  const navigate = useNavigate();
  const { setIsLogin } = useContext(IsLoginContext);

  // 물주기 로그를 추가하는 함수
  const addWateringLog = (time) => {
    const formattedTime = `${time.getMonth() + 1}월 ${time.getDate()}일 ${time.getHours()}시 ${time.getMinutes()}분`;

    const newLog = `포인트 10점 상승! \n시간: ${formattedTime}`;
    
    setWateringLogs((prevLogs) => [newLog, ...prevLogs]);
  };

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
              <span style={{ margin: "0", fontSize: "2em" }}>{myInfo.name}</span>
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

      <Divider
        orientation="left"
        style={{ marginBottom: "0px", textAlign: "left", color: gray[7] }}
      >
        <h5>
          <DollarOutlined style={{ marginRight: "5px" }} />
          포인트 적립 내역
        </h5>
      </Divider>

      {/* 물주기 로그만 렌더링 */}
      <List
        style={{ backgroundColor: "white", border: "none" }}
        bordered
        dataSource={wateringLogs}
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
