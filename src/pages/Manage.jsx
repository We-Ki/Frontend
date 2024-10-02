import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button } from "antd";
import { gray, blue, red } from "@ant-design/colors";
import { SmileOutlined, MehOutlined, FrownOutlined } from "@ant-design/icons";
import { RiWaterFlashLine } from "react-icons/ri";
import { useParams } from "react-router-dom"; // useParams 임포트
import BackButton from "../components/BackButton";
import ContentHeader from "../components/ContentHeader";

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

const CurrentStatusCard = ({ data }) => (
  <Card title="현재 상태" bordered={false}>
    <Table dataSource={data} columns={columns} pagination={false} />
  </Card>
);

const StandardEnvironmentCard = ({ data }) => (
  <Card title="표준 환경" bordered={false}>
    <Table dataSource={data} columns={columns} pagination={false} />
  </Card>
);

const Manage = () => {
  const { farmId } = useParams(); // URL에서 farmId 가져오기

  const [joined, setJoined] = useState(false);

  const [currentStatus, setCurrentStatus] = useState([]);
  const [standardEnvironment, setStandardEnvironment] = useState([]);
  const [currentAirTemperature, setCurrentAirTemperature] = useState(20); // 대기 온도
  const [currentSoilTemperature, setCurrentSoilTemperature] = useState(18); // 토양 온도
  const [currentAirHumidity, setCurrentAirHumidity] = useState(60); // 대기 습도
  const [light, setLight] = useState("3단계"); // 조명 단계
  const [lightTime, setLightTime] = useState("16시간"); // 조명 지속 시간
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
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log(localStorage.getItem("userUUID"));
          setJoined(
            data.message.users.includes(localStorage.getItem("userUUID"))
          );
        })
        .catch((err) => console.error("Fetching error:", err));
    };

    fetchFarmData(); // 농장 데이터를 불러오기
  }, [farmId, setJoined]);

  // 물주기 버튼을 눌렀을 때 5%씩 토양 습도 증가
  const handleWatering = () => {
    setCurrentSoilHumidity((prevHumidity) => Math.min(prevHumidity + 5, 100)); // 최대 100%까지 증가
  };

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

  // 토양 습도에 따른 상태 결정
  let iconColorConfig = { smile: gray[2], meh: gray[2], frown: gray[2] };
  let statusMessage = "";
  let statusSubMessage = "";

  if (currentSoilHumidity <= 30) {
    iconColorConfig.frown = red[4];
    statusMessage = "물이 부족해요.";
    statusSubMessage = "물주기 버튼을 눌러서 물을 주세요.";
  } else if (currentSoilHumidity > 30 && currentSoilHumidity <= 50) {
    iconColorConfig.meh = gray[6];
    statusMessage = "보통이에요.";
    statusSubMessage = "토양 수분이 적정 범위에요.";
  } else if (currentSoilHumidity > 50 && currentSoilHumidity <= 60) {
    iconColorConfig.smile = blue.primary;
    statusMessage = "완벽해요.";
    statusSubMessage = "토양 습도가 최고의 상태에요.";
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <BackButton label={"내 농장"} url="/" />
        {joined ? undefined : <Button onClick={joinFarm}>가입하기</Button>}
      </div>
      <ContentHeader title={"재배 환경"} />
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

      <Row style={{ marginBottom: "30px", textAlign: "center" }}>
        <Col span={6}></Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            shape="circle"
            className="custom-large-button"
            onClick={handleWatering}
            icon={
              <RiWaterFlashLine
                style={{ fontSize: "60px", color: blue.primary }}
              />
            }
          ></Button>
        </Col>
        <Col span={6}></Col>
      </Row>

      {/* 현재 토양 습도 표시 */}
      <Row style={{ marginTop: "30px", textAlign: "center" }}>
        <Col span={24}>
          <h3>현재 토양 습도: {currentSoilHumidity}%</h3>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CurrentStatusCard data={currentStatus} />
        </Col>
        <Col span={12}>
          <StandardEnvironmentCard data={standardEnvironment} />
        </Col>
      </Row>
    </>
  );
};

export default Manage;
