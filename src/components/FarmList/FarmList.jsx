import React from "react";
import FarmItem from "./FarmItem";
import "./FarmList.css";

const farms = [...Array(10)];

const FarmList = () => {
  return (
    <div className="FarmList">
      {farms.map((_, index) => {
        return (
          <FarmItem title={`${index + 1}번째 농장`} description={"채소농장"} />
        );
      })}
      {[...Array(5 - (farms.length % 5))].map((_, index) => {
        return <div style={{ width: "19%" }}></div>;
      })}
    </div>
  );
};

export default FarmList;
