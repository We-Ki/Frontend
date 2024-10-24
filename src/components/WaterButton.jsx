import React from "react";
import { Button } from "antd";
import { RiWaterFlashLine } from "react-icons/ri";

import styles from "./WaterButton.module.css";
import { blue } from "@ant-design/colors";
import createToast from "../Luna/createToast";

const WaterButton = ({ farmId, joined }) => {
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
          createToast("물주기에 성공하여 10포인트를 획득하였습니다.");
        } else {
          createToast("물주기에 실패하였습니다.");
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
