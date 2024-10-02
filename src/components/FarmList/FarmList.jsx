import React, { useState, useEffect } from "react";
import FarmItem from "./FarmItem";
import styles from "./FarmList.module.css";

const FarmList = ({ url }) => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    const fetchFarms = () => {
      fetch(url, {
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
  });

  return (
    <div className={styles.FarmList}>
      {farms.map((data) => (
        <FarmItem
          key={data._id}
          farmId={data._id}
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
