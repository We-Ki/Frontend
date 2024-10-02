import React from "react";
import ContentHeader from "../components/ContentHeader";
import FarmList from "../components/FarmList/FarmList";

const Farms = () => (
  <>
    <ContentHeader
      title={"다른 농장"}
      sub={"새로운 농장을 탐색하고\n농작물을 같이 길러요!"}
    />
    <FarmList url={`http://${process.env.REACT_APP_API_URL}/farms`} />
  </>
);

export default Farms;
