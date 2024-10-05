import React from "react";
import FarmList from "../components/FarmList/FarmList";
import ContentHeader from "../components/ContentHeader";
import { Button } from "antd";  // Ant Design의 버튼 사용
import { useNavigate } from "react-router-dom";  // 페이지 이동을 위해 useNavigate 사용

const Home = () => {
  const navigate = useNavigate();  // 페이지 이동 함수

  const handleAddFarm = () => {
    navigate("/farmadd");  // "농장 추가" 버튼 클릭 시 farmadd 경로로 이동
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ContentHeader title={"내 농장"} sub={"한눈에 관리하는\n나만의 농장"} />
        <Button type="primary" onClick={handleAddFarm} style={{ marginRight: '20px' }}>
          농장 추가
        </Button>
      </div>
      <FarmList url={`http://${process.env.REACT_APP_API_URL}/farms/joined`} />
    </>
  );
};

export default Home;
