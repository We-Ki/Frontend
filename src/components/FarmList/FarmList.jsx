import React, { useState, useEffect } from "react";
import FarmItem from "./FarmItem";
import "./FarmList.css";

// const farms = [...Array(10)];

const FarmList = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    const fetchFarms = () => {
      fetch(`http://${process.env.REACT_APP_API_URL}/farms/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
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
      {farms.map((data, index) => {
        return (
          <FarmItem
            key={`${data._id}`}
            title={`${data.name}`}
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
