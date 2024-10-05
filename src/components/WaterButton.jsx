import React from "react";
import { Button } from "antd";
import { RiWaterFlashLine } from "react-icons/ri";

import styles from "./WaterButton.module.css";
import { blue } from "@ant-design/colors";

const WaterButton = ({ farmId, joined, setCurrentSoilHumidity }) => {
  // 물주기 버튼을 눌렀을 때 5%씩 토양 습도 증가 및 서버에 신호 전송
  const handleWatering = () => {
    // 서버로 POST 요청 전송
    fetch(`http://${process.env.REACT_APP_API_URL}/farms/${farmId}/water`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to send water request");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          // 성공적으로 전송되면 토양 습도를 5% 증가시킴
          setCurrentSoilHumidity((prevHumidity) =>
            Math.min(prevHumidity + 5, 100)
          );

          // TODO: 물주기 명령 전송 성공 시 Toast 띄우기
        } else {
          // TODO: 물주기 명령 전송 실패 시 Toast 띄우기
        }
      })
      .catch((err) => console.error("Error watering:", err));
  };
  if (joined)
    return (
      <Button
        shape="circle"
        className={styles.CustomLargeButton}
        onClick={handleWatering}
        icon={
          <RiWaterFlashLine style={{ fontSize: "60px", color: blue.primary }} />
        }
      />
    );
  return undefined;
};

export default WaterButton;
