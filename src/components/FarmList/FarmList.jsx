import React from "react";
import FarmItem from "./FarmItem";
import "./FarmList.css";

const farms = [...Array(10)];

const FarmList = () => {
  return (
    <div className="FarmList">
      {farms.map((data, index) => {
        return (
          <FarmItem
            key={`${index}`}
            title={`${index + 1}번째 농장`}
            description={"채소농장"}
          />
        );
      })}
      {[...Array(farms.length % 5 === 0 ? 0 : 5 - (farms.length % 5))].map(
        (_, index) => {
          return <div key={`${index}`} style={{ width: "19%" }}></div>;
        }
      )}
    </div>
  );
};

export default FarmList;
