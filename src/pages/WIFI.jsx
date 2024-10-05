import React, { useState } from "react";
import { Input, Button } from "antd";
import ContentHeader from "../components/ContentHeader";
import { useNavigate } from "react-router-dom";

const WIFI = () => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleConnect = () => {
    console.log("SSID:", ssid);
    console.log("Password:", password);
    // 여기에 와이파이 연결 로직 추가
  };

  return (
    <>
      <ContentHeader title={"와이파이 설정"} sub={"와이파이 정보를 입력해주세요."} />
      <div style={{ margin: "20px" }}>
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
          연결
        </Button>
        <Button
          onClick={() => {
            navigate("/wifi");
          }}
          style={{ marginTop: "10px" }}
        >
          와이파이 추가
        </Button>
      </div>
    </>
  );
};

export default WIFI;