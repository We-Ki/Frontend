import React, { useState } from "react";
import { Input, Button } from "antd";
import ContentHeader from "../components/ContentHeader";

const AddDevice = () => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");

  const handleConnect = () => {
    console.log("SSID:", ssid);
    console.log("Password:", password);
    // 여기에 와이파이 연결 로직 추가
  };

  return (
    <>
      <ContentHeader
        title={"기기 추가"}
        sub={"와이파이 정보를 입력해주세요."}
      />
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
          기기 추가
        </Button>
      </div>
    </>
  );
};

export default AddDevice;
