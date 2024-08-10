import React from "react";
import { Divider, List } from "antd";
import { VideoCameraOutlined, LineChartOutlined } from "@ant-design/icons";
import { gray } from "@ant-design/colors";
import ContentHeader from "../components/ContentHeader";

const data = ["1번 구역", "2번 구역", "3번 구역", "4번 구역", "5번 구역"];

const Analytics = () => (
  <>
    <ContentHeader
      title={"분석"}
      sub={"데이터 분석을 통한\n똑똑한 농장 관리"}
    />
    <Divider
      orientation="left"
      style={{ marginBottom: "0px", textAlign: "left", color: gray[7] }}
    >
      <h5>
        <VideoCameraOutlined style={{ marginRight: "5px" }} />
        실시간 카메라 보기
      </h5>
    </Divider>
    <List
      style={{ backgroundColor: "white", border: "none" }}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          style={{ fontWeight: "bold", color: gray[7], fontSize: "10px" }}
        >
          {item}
        </List.Item>
      )}
    />
    <Divider
      orientation="left"
      style={{ marginBottom: "0px", textAlign: "left", color: gray[7] }}
    >
      <h5>
        <LineChartOutlined style={{ marginRight: "5px" }} />
        데이터 분석 및 보고서
      </h5>
    </Divider>
    <List
      style={{ backgroundColor: "white", border: "none" }}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          style={{ fontWeight: "bold", color: gray[7], fontSize: "10px" }}
        >
          {item}
        </List.Item>
      )}
    />
  </>
);

export default Analytics;
