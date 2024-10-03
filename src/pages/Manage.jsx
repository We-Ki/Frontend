import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { gray, blue, red, green } from "@ant-design/colors";
import { SmileOutlined, MehOutlined, FrownOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate 추가
import BackButton from "../components/BackButton";
import ContentHeader from "../components/ContentHeader";
import CardWithTable from "../components/CardWithTable";

import JoinButton from "../components/JoinButton";
import WaterButton from "../components/WaterButton";

const columns = [
  {
    title: "변수",
    dataIndex: "column1",
    key: "column1",
  },
  {
    title: "값",
    dataIndex: "column2",
    key: "column2",
  },
];

const Manage = () => {
  const { farmId } = useParams(); // URL에서 farmId 가져오기
  const navigate = useNavigate(); // navigate 훅 추가

  const [joined, setJoined] = useState(false);
  const [farmName, setFarmName] = useState("");

  const [currentStatus, setCurrentStatus] = useState([]);
  const [standardEnvironment, setStandardEnvironment] = useState([]);
  const [currentAirTemperature, setCurrentAirTemperature] = useState(20); // 대기 온도
  const [currentAirHumidity, setCurrentAirHumidity] = useState(60); // 대기 습도
  const [currentSoilHumidity, setCurrentSoilHumidity] = useState(15); // 초기 토양 습도

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
            // 스마트팜 ID가 유효하지 않으면 NotFound로 리다이렉트
            navigate("/");
          }
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setJoined(
            data.message.users.includes(localStorage.getItem("userUUID"))
          );
          setFarmName(data.message.name);
        })
        .catch((err) => {
          console.error("Fetching error:", err);
          navigate("/"); // 오류 발생 시에도 홈으로 이동
        });
    };

    fetchFarmData(); // 농장 데이터를 불러오기
  }, [farmId, setJoined, navigate]);

  // 토양 습도에 따른 상태 결정
  let iconColorConfig = { smile: gray[2], meh: gray[2], frown: gray[2] };
  let statusMessage = "";
  let statusSubMessage = "";

  if (currentSoilHumidity <= 30) {
    iconColorConfig.frown = red[4];
    statusMessage = "물이 부족해요.";
    statusSubMessage = "물주기 버튼을 눌러서 물을 주세요.";
  } else if (currentSoilHumidity > 30 && currentSoilHumidity <= 50) {
    iconColorConfig.meh = blue.primary;
    statusMessage = "보통이에요.";
    statusSubMessage = "토양 수분이 적정 범위에요.";
  } else if (currentSoilHumidity > 50 && currentSoilHumidity <= 60) {
    iconColorConfig.smile = green.primary;
    statusMessage = "완벽해요.";
    statusSubMessage = "토양 습도가 최고의 상태에요.";
  }

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
        <JoinButton farmId={farmId} joined={joined} setJoined={setJoined} />
      </div>
      <ContentHeader
        title={farmName}
        sub={"현재 농장의 상태를\n확인해 보세요"}
      />
      <Row
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Col span={3}></Col>
        <Col span={6}>
          <SmileOutlined
            style={{ fontSize: "90px", color: iconColorConfig.smile }}
          />
        </Col>
        <Col span={6}>
          <MehOutlined
            style={{ fontSize: "90px", color: iconColorConfig.meh }}
          />
        </Col>
        <Col span={6}>
          <FrownOutlined
            style={{ fontSize: "90px", color: iconColorConfig.frown }}
          />
        </Col>
        <Col span={3}></Col>
      </Row>

      <Row style={{ marginBottom: "10px", textAlign: "center" }}>
        <Col span={6}></Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <h1>{statusMessage}</h1>
          <h3 style={{ color: gray.primary }}>{statusSubMessage}</h3>
        </Col>
        <Col span={6}></Col>
      </Row>

      <WaterButton
        setCurrentSoilHumidity={setCurrentSoilHumidity}
        farmId={farmId}
        joined={joined}
      />

      {/* 현재 토양 습도 표시 */}
      <Row style={{ marginTop: "30px", textAlign: "center" }}>
        <Col span={24}>
          <h3>현재 토양 습도: {currentSoilHumidity}%</h3>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CardWithTable
            title={"현재 상태"}
            data={currentStatus}
            columns={columns}
          />
        </Col>
        <Col span={12}>
          <CardWithTable
            title={"표준 환경"}
            data={currentStatus}
            columns={columns}
          />
        </Col>
      </Row>
    </>
  );
};

export default Manage;
