import React from "react";
import { useNavigate } from "react-router-dom";
import { Segmented } from "antd";
import {
  HomeOutlined as HomeIcon,
  SunOutlined as ManageIcon,
  MenuOutlined as MenuIcon,
  LineChartOutlined as AnalyticsIcon,
  UserOutlined as MyPageIcon,
} from "@ant-design/icons";

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

const menus = [
  {
    name: "홈",
    value: "home",
    icon: HomeIcon,
  },
  {
    name: "관리",
    value: "manage",
    icon: ManageIcon,
  },
  {
    name: "전체",
    value: "menu",
    icon: MenuIcon,
  },
  {
    name: "분석",
    value: "analytics",
    icon: AnalyticsIcon,
  },
  {
    name: "마이",
    value: "mypage",
    icon: MyPageIcon,
  },
];

const Navigation = () => {
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

  return <Segmented options={options} block onChange={handleSegmentedChange} />;
};

export default Navigation;
