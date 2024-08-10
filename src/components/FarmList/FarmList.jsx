import React from "react";
import FarmItem from "./FarmItem";
import "./FarmList.css";

const FarmList = () => {
  return (
    <div className="FarmList">
      {[...Array(10)].map((_, index) => {
        return (
          <FarmItem title={`${index + 1}번째 농장`} description={"채소농장"} />
        );
      })}
    </div>
  );
};

export default FarmList;
