import React from "react";
import FarmList from "../components/FarmList/FarmList";
import ContentHeader from "../components/ContentHeader";
import CreateFarmButton from "../components/CreateFarmButton";

const Home = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ContentHeader title={"내 농장"} sub={"한눈에 관리하는\n나만의 농장"} />
        <CreateFarmButton />
      </div>
      <FarmList url={`http://${process.env.REACT_APP_API_URL}/farms/joined`} />
    </>
  );
};

export default Home;
