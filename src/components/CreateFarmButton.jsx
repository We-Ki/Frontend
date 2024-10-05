import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const CreateFarmButton = () => {
  const navigate = useNavigate();

  const [isFarmer, setIsFarmer] = useState(false);

  useEffect(() => {
    const fetchFarms = () => {
      fetch(`http://${process.env.REACT_APP_API_URL}/users/me`, {
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
          setIsFarmer(data.message.userGroup === "farmer");
        })
        .catch((err) => console.error("Fetching error:", err));
    };

    fetchFarms();
  });

  return isFarmer ? (
    <Button
      type="primary"
      onClick={() => {
        navigate("/farmadd");
      }}
      size="large"
    >
      농장 생성하기
    </Button>
  ) : undefined;
};

export default CreateFarmButton;
