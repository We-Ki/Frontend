import React, { useEffect, useState } from "react";
import { Divider, List } from "antd";
import { VideoCameraOutlined, LineChartOutlined } from "@ant-design/icons";
import { gray } from "@ant-design/colors";
import ContentHeader from "../components/ContentHeader";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import JoinButton from "../components/JoinButton";
import LS2Request from "@enact/webos/LS2Request";
import createToast from "../Luna/createToast";

const tomatoData = [
  "토마토 세균성 반점병",
  "토마토 초기 마름병",
  "토마토 늦은 마름병",
  "토마토 잎곰팡이병",
  "토마토 세포리움 잎마름병",
  "토마토 점박이응애",
  "토마토 표적 반점병",
  "토마토 황화잎말림 바이러스",
  "토마토 모자이크 바이러스",
  "건강한 토마토",
];

const webOSBridge = new LS2Request();

const Analytics = () => {
  const { farmId } = useParams(); // URL에서 farmId 가져오기

  const [joined, setJoined] = useState(false);
  const [farmName, setFarmName] = useState();
  const [camera, setCamera] = useState();
  const [AI, setAI] = useState(tomatoData[1]);

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
      case `${farmId}/camera`:
        setCamera(res.Response);
        break;
      case `${farmId}/AI`:
        setAI(tomatoData[res.Response]);
        if (res.Response !== 9) {
          createToast("병해충 감염이 확인되었습니다.");
        }
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
        findHandler(msg);
      },
      onFailure: (err) => {},
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
        .catch((err) => console.error("Fetching error:", err));
    };

    fetchFarmData(); // 농장 데이터를 불러오기

    start();
  }, [farmId, setJoined, setCamera, init, loop]);

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
        sub={"데이터 분석을 통해\n똑똑하게 관리해보세요"}
      />
      <Divider
        orientation="left"
        style={{ marginBottom: "0px", textAlign: "left", color: gray[7] }}
      >
        <h5>
          <VideoCameraOutlined style={{ marginRight: "5px" }} />
          실시간 카메라 보기
        </h5>
      </Divider>
      {camera ? (
        <img src={`data:image/jpeg;base64,${camera}`} alt="Camera" />
      ) : undefined}
      <Divider
        orientation="left"
        style={{ marginBottom: "0px", textAlign: "left", color: gray[7] }}
      >
        <h5>
          <LineChartOutlined style={{ marginRight: "5px" }} />
          데이터 분석 및 보고서
        </h5>
        {AI}
      </Divider>
    </>
  );
};

export default Analytics;
