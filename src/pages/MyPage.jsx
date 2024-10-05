import React, { useContext, useEffect, useState } from "react";
import { List, Divider, Card, Avatar, Button } from "antd";
import { UserOutlined, DollarOutlined } from "@ant-design/icons";
import { gray } from "@ant-design/colors";
import ContentHeader from "../components/ContentHeader";
import { IsLoginContext } from "../contexts/IsLoginContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [myInfo, setMyInfo] = useState({});  // 사용자 정보 저장
  const [wateringLogs, setWateringLogs] = useState([]); // 물주기 로그 상태 추가

  const navigate = useNavigate();
  const { setIsLogin } = useContext(IsLoginContext);

  useEffect(() => {
    // 사용자 정보 가져오기
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
          setMyInfo(data.message); // 사용자 정보를 상태로 저장
        })
        .catch((err) => console.error("Fetching error:", err));
    };

    fetchFarms();

    // 물주기 로그 가져오기
    const fetchWateringLogs = () => {
      fetch(`http://${process.env.REACT_APP_API_URL}/users/me/water`, {
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
          if (data.success) {
            // 서버에서 받은 물주기 로그를 포맷팅 및 최신순 정렬
            const logs = data.message.map((log) => {
              const wateredAt = new Date(log.wateredAt); // 로그의 날짜 정보
              const formattedTime = `${wateredAt.getMonth() + 1}월 ${wateredAt.getDate()}일 ${wateredAt.getHours()}시 ${wateredAt.getMinutes()}분`;
              return `포인트 10점 상승! \n시간: ${formattedTime}`; // 사용자에게 보여줄 형식으로 변환
            }).reverse(); // 최신순으로 정렬
            setWateringLogs(logs); // 물주기 로그 상태로 저장
          }
        })
        .catch((err) => console.error("Fetching error:", err));
    };

    fetchWateringLogs();
  }, []); // 컴포넌트가 처음 로드될 때 서버에서 데이터 가져오기

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
            setIsLogin(false); // 로그아웃 버튼 클릭 시 로그아웃 처리
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

      {/* 서버에서 가져온 물주기 로그를 리스트로 렌더링 */}
      <List
        style={{ backgroundColor: "white", border: "none" }}
        bordered
        dataSource={wateringLogs} // 서버에서 받아온 물주기 로그
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
