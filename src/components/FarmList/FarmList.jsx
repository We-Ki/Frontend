import React, { useState, useEffect } from "react";
import FarmItem from "./FarmItem";
import "./FarmList.css";

const FarmList = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    const fetchFarms = () => {
      fetch(`http://${process.env.REACT_APP_API_URL}/farms/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setFarms(data.message);
        })
        .catch((err) => console.error("Fetching error:", err));
    };

    fetchFarms();
  }, []);

  return (
    <div className="FarmList">
      {farms.map((data) => (
        <FarmItem
          key={data._id}
          farmId={data._id} // 각 농장의 고유 ID를 farmId로 전달
          title={data.name}
          description={"채소농장"}
        />
      ))}
      {[...Array(farms.length % 5 === 0 ? 0 : 5 - (farms.length % 5))].map(
        (_, index) => (
          <div key={index} style={{ width: "19%" }}></div>
        )
      )}
    </div>
  );
};

export default FarmList;
