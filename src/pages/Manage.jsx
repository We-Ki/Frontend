import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import { gray, blue, red, green } from "@ant-design/colors";
import { SmileOutlined, MehOutlined, FrownOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import ContentHeader from "../components/ContentHeader";
import CardWithTable from "../components/CardWithTable";
import JoinButton from "../components/JoinButton";
import WaterButton from "../components/WaterButton";
import LS2Request from "@enact/webos/LS2Request";

const columns = [
  {
    title: "구분",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "값",
    dataIndex: "value",
    key: "value",
  },
];

const webOSBridge = new LS2Request();

const Manage = () => {
  const { farmId } = useParams();
  const navigate = useNavigate();

  const [joined, setJoined] = useState(false);
  const [farmName, setFarmName] = useState("");

  const [standardEnvironment, setStandardEnvironment] = useState([]);
  const [currentAirTemperature, setCurrentAirTemperature] = useState(20);
  const [currentAirHumidity, setCurrentAirHumidity] = useState(60);
  const [currentSoilHumidity, setCurrentSoilHumidity] = useState(15);
  const [currentAirQuality, setCurrentAirQuality] = useState();

  const currentDataset = [
    { key: 1, type: "온도", value: currentAirTemperature },
    { key: 2, type: "습도", value: currentAirHumidity },
    { key: 3, type: "토양수분", value: currentSoilHumidity },
    { key: 4, type: "공기질", value: currentAirQuality },
  ];

  const init = () => {
    return new Promise((resolve, reject) => {
      let params = { subscribe: true };
      let lsRequest = {
        service: "luna://com.weki.service",
        method: "init",
        parameters: params,
        onSuccess: (msg) => {
          findHandler(msg);
          resolve();
          console.log("[init]", msg);
        },
        onFailure: (err) => {
          console.log(err);
          reject();
        },
      };
      webOSBridge.send(lsRequest);
    });
  };

  const findHandler = (res) => {
    console.log(res);
    switch (res.topic) {
      case `${farmId}/humid/soil`:
        setCurrentSoilHumidity(res.Response);
        break;
      case `${farmId}/temp`:
        setCurrentAirTemperature(res.Response);
        break;
      case `${farmId}/airQuality/sensor`:
        setCurrentAirQuality(res.Response);
        break;
      case `${farmId}/humid/air`:
        setCurrentAirHumidity(res.Response);
        break;
      default:
        break;
    }
  };

  const loop = () => {
    let params = { subscribe: true };
    let lsRequest = {
      service: "luna://com.weki.service",
      method: "loop",
      parameters: params,
      onSuccess: (msg) => {
        console.log(msg);
        findHandler(msg);
      },
      onFailure: (err) => {
        console.log(err);
      },
    };
    webOSBridge.send(lsRequest);
  };

  useEffect(() => {
    async function start() {
      await init();
      loop();
    }
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
          setJoined(
            data.message.users.includes(localStorage.getItem("userUUID")) ||
              data.message.farmer._id === localStorage.getItem("userUUID")
          );
          setFarmName(data.message.name);
        })
        .catch((err) => {
          console.error("Fetching error:", err);
          navigate("/");
        });
    };

    fetchFarmData();
    start();
  }, [farmId, setJoined, navigate, init, loop]);

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

      <WaterButton farmId={farmId} joined={joined} />

      <Row gutter={16}>
        <Col span={12}>
          <CardWithTable
            title={"현재 상태"}
            data={currentDataset}
            columns={columns}
          />
        </Col>
        <Col span={12}>
          <CardWithTable
            title={"표준 환경"}
            data={standardEnvironment}
            columns={columns}
          />
        </Col>
      </Row>
    </>
  );
};

export default Manage;
