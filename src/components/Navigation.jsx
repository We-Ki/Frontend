import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Segmented } from "antd";

const labelStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: 4,
};

const iconStyle = {
  fontSize: "18px",
  marginBottom: "-3px",
  marginTop: "8px",
};

const Navigation = ({ menus, current }) => {
  const navigate = useNavigate();

  const handleSegmentedChange = (value) => {
    navigate(`/${value}`);
  };

  const options = menus.map((menu) => {
    const Icon = menu.icon;
    return {
      label: (
        <div style={labelStyle}>
          <Icon style={iconStyle} />
          <div>{menu.name}</div>
        </div>
      ),
      value: menu.value,
    };
  });

  return (
    <Segmented
      options={options}
      block
      onChange={handleSegmentedChange}
      value={useLocation().pathname.split("/")[1]}
    />
  );
};

export default Navigation;
