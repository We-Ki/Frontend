import React from "react";
import { useNavigate } from "react-router-dom";
import { Segmented } from "antd";
import {
  HomeOutlined,
  SunOutlined,
  UserOutlined,
  LineChartOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const Navigation = () => {
  const navigate = useNavigate();

  const handleSegmentedChange = (value) => {
    navigate(`/${value}`);
  };

  return (
    <Segmented
      options={[
        {
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: 4,
              }}
            >
              <HomeOutlined
                style={{
                  fontSize: "18px",
                  marginBottom: "-3px",
                  marginTop: "8px",
                }}
              />
              <div>홈</div>
            </div>
          ),
          value: "home",
        },
        {
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: 4,
              }}
            >
              <SunOutlined
                style={{
                  fontSize: "18px",
                  marginBottom: "-3px",
                  marginTop: "8px",
                }}
              />
              <div>관리</div>
            </div>
          ),
          value: "manage",
        },
        {
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: 4,
              }}
            >
              <MenuOutlined
                style={{
                  fontSize: "18px",
                  marginBottom: "-3px",
                  marginTop: "8px",
                }}
              />
              <div>전체</div>
            </div>
          ),
          value: "menu",
        },
        {
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: 4,
              }}
            >
              <LineChartOutlined
                style={{
                  fontSize: "18px",
                  marginBottom: "-3px",
                  marginTop: "8px",
                }}
              />
              <div>분석</div>
            </div>
          ),
          value: "analytics",
        },
        {
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: 4,
              }}
            >
              <UserOutlined
                style={{
                  fontSize: "18px",
                  marginBottom: "-3px",
                  marginTop: "8px",
                }}
              />
              <div>마이</div>
            </div>
          ),
          value: "mypage",
        },
      ]}
      block
      onChange={handleSegmentedChange}
    />
  );
};

export default Navigation;
