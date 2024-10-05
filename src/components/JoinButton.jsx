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

  return !joined ? (
    <Button type="primary" onClick={joinFarm} size="large">
      가입하기
    </Button>
  ) : undefined;
};

export default JoinButton;
