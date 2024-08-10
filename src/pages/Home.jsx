import React from "react";
import FarmList from "../components/FarmList/FarmList";
import ContentHeader from "../components/ContentHeader";

const Home = () => (
  <>
    <ContentHeader title={"홈"} sub={"한눈에 관리하는\n나만의 농장"} />
    <FarmList />
  </>
);

export default Home;
