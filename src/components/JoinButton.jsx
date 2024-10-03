import React from "react";
import { Button } from "antd";

const JoinButton = ({ joined, setJoined, farmId }) => {
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
        setJoined(data.success);
      })
      .catch((err) => console.error("Fetching error:", err));
  };

  if (joined) return undefined;
  return <Button onClick={joinFarm}>가입하기</Button>;
};

export default JoinButton;
