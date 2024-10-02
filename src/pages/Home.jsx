import React from "react";
import FarmList from "../components/FarmList/FarmList";
import ContentHeader from "../components/ContentHeader";

const Home = () => (
  <>
    <ContentHeader title={"홈"} sub={"한눈에 관리하는\n나만의 농장"} />
    <FarmList url={`http://${process.env.REACT_APP_API_URL}/farms/joined`} />
  </>
);

export default Home;
