import React from "react";
import { Button } from "antd";

const JoinButton = ({ joined, setJoined, farmId }) => {
  // 농장 가입 함수
  const joinFarm = () => {
    fetch(`http://${process.env.REACT_APP_API_URL}/farms/${farmId}/join`, {
      method: "POST",
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
        setJoined(data.success); // 가입 성공 시 상태 업데이트
      })
      .catch((err) => console.error("Fetching error:", err));
  };

  // 농장 탈퇴 함수
  const leaveFarm = () => {
    fetch(`http://${process.env.REACT_APP_API_URL}/farms/${farmId}/leave`, {
      method: "DELETE",
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
        setJoined(!data.success); // 탈퇴 성공 시 joined 상태를 false로 업데이트
      })
      .catch((err) => console.error("Fetching error:", err));
  };

  return !joined ? (
    <Button type="primary" onClick={joinFarm}>
      가입하기
    </Button>
  ) : (
    <Button type="danger" onClick={leaveFarm}>
      탈퇴하기
    </Button>
  ); // 가입 상태에 따라 버튼을 조건부로 렌더링
};

export default JoinButton;
