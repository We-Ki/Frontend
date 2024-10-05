import React, { useState } from "react";
import { Input, Button } from "antd";
import ContentHeader from "../components/ContentHeader";
import { useNavigate } from "react-router-dom";

const FarmAdd = () => {
  const [farmName, setFarmName] = useState("");
  const navigate = useNavigate();

  const handleAddFarm = () => {
    console.log("농장 이름:", farmName);
    // 여기에 농장 추가 로직을 넣으면 됩니다. 예: 서버로 API 요청
  };

  return (
    <>
      <ContentHeader title={"내 농장 추가"} sub={"새로운 농장을 추가하려면 농장의 이름을 입력해주세요."} />
      <div style={{ margin: "20px" }}>
        <Input
          placeholder="농장 이름"
          value={farmName}
          onChange={(e) => setFarmName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button type="primary" onClick={handleAddFarm}>
          농장 추가
        </Button>
        <Button
          onClick={() => {
            navigate("/farms");
          }}
          style={{ marginTop: "10px" }}
        >
          돌아가기
        </Button>
      </div>
    </>
  );
};

export default FarmAdd;
