import React, { useEffect, useState } from "react";
import ContentHeader from "../components/ContentHeader";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { Button } from "antd";

const FarmSetting = () => {
  const { farmId } = useParams();
  const navigate = useNavigate();

  const [joined, setJoined] = useState(false);
  const [farmName, setFarmName] = useState("");
  const [isFarmer, setIsFarmer] = useState(false);

  useEffect(() => {
    const fetchFarmData = () => {
      fetch(`http://${process.env.REACT_APP_API_URL}/farms/${farmId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (res.status === 404) {
            navigate("/");
          }
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setIsFarmer(
            data.message.farmer._id === localStorage.getItem("userUUID")
          );
          setJoined(
            data.message.users.includes(localStorage.getItem("userUUID"))
          );
          setFarmName(data.message.name);
        })
        .catch((err) => {
          console.error("Fetching error:", err);
          navigate("/");
        });
    };

    fetchFarmData();
  }, [farmId, setJoined, navigate]);

  // 농장 탈퇴 함수
  const leaveFarm = () => {
    fetch(`http://${process.env.REACT_APP_API_URL}/farms/${farmId}/join`, {
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
        setJoined(false); // 탈퇴 성공 시 joined 상태를 false로 업데이트
        navigate("/");
      })
      .catch((err) => console.error("Fetching error:", err));
  };

  const deleteFarm = (values) => {
    fetch(`http://${process.env.REACT_APP_API_URL}/farms/${farmId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(values);
        return res.json();
      })
      .then((body) => {
        if (body.success) {
          navigate(`/`);
        }
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BackButton label={"내 농장"} url="/" />
      </div>
      <ContentHeader title={farmName} sub={"농장 설정"} />
      {joined ? (
        <>
          <h2>농장 탈퇴하기</h2>
          <Button type="primary" onClick={leaveFarm}>
            탈퇴하기
          </Button>
        </>
      ) : undefined}
      {isFarmer ? (
        <>
          <h2>기기 추가하기</h2>
          <Button
            type="primary"
            onClick={() => {
              navigate(`/adddevice`);
            }}
          >
            기기 추가
          </Button>
          <h2>농장 삭제하기</h2>
          <Button type="primary" onClick={deleteFarm}>
            농장 삭제
          </Button>
        </>
      ) : undefined}
    </>
  );
};

export default FarmSetting;
