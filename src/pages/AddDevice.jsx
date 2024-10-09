import React, { useState } from "react";
import { Input, Button } from "antd";
import ContentHeader from "../components/ContentHeader";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import LS2Request from "@enact/webos/LS2Request";
import { lunaAPI } from "../Luna/luna";

const searchWifiBridge = new LS2Request();
const getWifiStatusBridge = new LS2Request();
const connectWifiBridge = new LS2Request();
const disconnectWifiBridge = new LS2Request();

const AddDevice = () => {
  const { farmId } = useParams();

  const navigate = useNavigate();

  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [searchedWifi, setSearchedWifi] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [currentState, setCurrentState] = useState(undefined);

  const handleConnect = () => {
    console.log("SSID:", ssid);
    console.log("Password:", password);

    let formData = new FormData();
    formData.set("uuid", farmId);
    formData.set("ssid", ssid);
    formData.set("password", password);
    fetch(`http://192.168.4.1/connect`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res);
        console.log("이전 와이파이 연결시도중");
        setCurrentState("이전 와이파이 연결시도중");
        getCurrentProfile()
          .then(({ profileId }) => {
            if (profileId) return connectDevice(profileId, ssid, password);
            else return connectWifi(ssid, password);
          })
          .then(() => {
            navigate(`/maange/${farmId}`);
          });
      })
      .catch((err) => {
        console.log("이전 와이파이 연결시도중");
        setCurrentState("이전 와이파이 연결시도중");
        getCurrentProfile()
          .then(({ profileId }) => {
            if (profileId) return connectDevice(profileId, ssid, password);
            else return connectWifi(ssid, password);
          })
          .then(() => {
            navigate(`/maange/${farmId}`);
          });
      });
  };

  const connectDevice = (profileId, id, pw) => {
    return new Promise((resolve, reject) => {
      disConnectWifi(profileId)
        .then(() => {
          setCurrentState("와이파이 연결 해제 함");
          return connectWifi(id, pw);
        })
        .then(() => {
          setCurrentState("와이파이 연결함");
          resolve();
        });
    });
  };

  const disConnectWifi = (profileId) => {
    setCurrentState("와이파이 연결 해제 시도 중");
    return new Promise((resolve, reject) => {
      let params = { profileId };
      let lsRequest = {
        service: lunaAPI.wifi,
        method: "deleteprofile",
        parameters: params,
        onSuccess: (msg) => {
          console.log(msg);
          resolve();
        },
        onFailure: (err) => {
          console.log(err);
          reject(new Error(err));
        },
      };
      disconnectWifiBridge.send(lsRequest);
    });
  };

  const connectWifi = (id, pw) => {
    setCurrentState("와이파이 연결 시도 중");
    console.log(id);
    return new Promise((resolve, reject) => {
      let params = {
        ssid: id,
        wasCreatedWithJoinOther: true,
        security: {
          securityType: "psk",
          simpleSecurity: {
            passKey: pw,
          },
        },
      };
      let lsRequest = {
        service: lunaAPI.wifi,
        method: "connect",
        parameters: params,
        onSuccess: (msg) => {
          console.log(msg);
          resolve();
        },
        onFailure: (err) => {
          console.log(err);
          reject(new Error(err));
        },
      };
      connectWifiBridge.send(lsRequest);
    });
  };

  const getCurrentProfile = () => {
    return new Promise((resolve, reject) => {
      let params = { subscribe: false };
      let lsRequest = {
        service: lunaAPI.wifi,
        method: "getstatus",
        parameters: params,
        onSuccess: (msg) => {
          console.log(msg);
          console.log(msg);
          let result = { ipInfo: undefined, profileId: undefined };
          if (msg.networkInfo) {
            result = {
              profileId: msg.networkInfo.profileId,
              ipInfo: msg.ipInfo.ip,
            };
            resolve(result);
          } else resolve(result);
        },
        onFailure: (err) => {
          console.log(err);
          reject(new Error(err));
        },
      };
      getWifiStatusBridge.send(lsRequest);
    });
  };

  return (
    <>
      <BackButton url={`/manege/${farmId}`} />
      <ContentHeader
        title={"기기 추가"}
        sub={"와이파이 정보를 입력해주세요."}
      />
      <div>
        <Input
          placeholder="SSID"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input.Password
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button type="primary" onClick={handleConnect}>
          기기 추가
        </Button>
        {currentState}
      </div>
    </>
  );
};

export default AddDevice;
