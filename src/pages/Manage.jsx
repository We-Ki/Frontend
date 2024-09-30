import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button } from "antd";
import { gray, blue, red } from "@ant-design/colors";
import { ArrowLeftOutlined, SmileOutlined, MehOutlined, FrownOutlined } from "@ant-design/icons";
import { RiWaterFlashLine } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom"; // useParams, useNavigate 임포트

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
  const navigate = useNavigate(); // 홈으로 돌아가기 위한 navigate
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
      fetch(`http://${process.env.REACT_APP_API_URL}/farm/${farmId}`, {
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
          // 받아온 데이터를 통해 상태 업데이트
          setCurrentAirTemperature(data.airTemperature);
          setCurrentSoilTemperature(data.soilTemperature);
          setCurrentAirHumidity(data.airHumidity);
          setCurrentSoilHumidity(data.soilHumidity);
          setLight(data.light);
          setLightTime(data.lightTime);

          const currentStatusData = [
            { key: '1', column1: '대기 온도', column2: `${data.airTemperature}°C` },
            { key: '2', column1: '토양 온도', column2: `${data.soilTemperature}°C` },
            { key: '3', column1: '대기 습도', column2: `${data.airHumidity}%` },
            { key: '4', column1: '토양 습도', column2: `${data.soilHumidity}%` },
            { key: '5', column1: '조명', column2: data.light },
            { key: '6', column1: '조명 지속 시간', column2: data.lightTime },
          ];
          setCurrentStatus(currentStatusData);
        })
        .catch((err) => console.error("Fetching error:", err));
    };

    fetchFarmData(); // 농장 데이터를 불러오기
  }, [farmId]);

  // 물주기 버튼을 눌렀을 때 5%씩 토양 습도 증가
  const handleWatering = () => {
    setCurrentSoilHumidity((prevHumidity) => Math.min(prevHumidity + 5, 100)); // 최대 100%까지 증가
  };

  // 홈으로 돌아가는 함수
  const handleBackToHome = () => {
    navigate("/"); // 홈으로 이동
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
      <Row style={{ marginBottom: "10px", textAlign: "center" }}>
        <Col span={4}>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBackToHome}>
            <b style={{ color: gray[7] }}>{farmId} 구역</b> {/* farmId 표시 */}
          </Button>
        </Col>
        <Col span={20}></Col>
      </Row>
      <Row style={{ marginBottom: "30px", textAlign: "center" }}>
        <Col span={4}>
          <h3>재배 환경</h3>
        </Col>
        <Col span={20}></Col>
      </Row>
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
          <SmileOutlined style={{ fontSize: "90px", color: iconColorConfig.smile }} />
        </Col>
        <Col span={6}>
          <MehOutlined style={{ fontSize: "90px", color: iconColorConfig.meh }} />
        </Col>
        <Col span={6}>
          <FrownOutlined style={{ fontSize: "90px", color: iconColorConfig.frown }} />
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
            icon={<RiWaterFlashLine style={{ fontSize: "60px", color: blue.primary }} />}
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
