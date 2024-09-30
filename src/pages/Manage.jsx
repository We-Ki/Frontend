import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button } from "antd";
import { gray, blue, red } from "@ant-design/colors";
import { ArrowLeftOutlined, SmileOutlined, MehOutlined, FrownOutlined } from "@ant-design/icons";
import { RiWaterFlashLine } from "react-icons/ri";
import axios from "axios"; // axios 임포트

const columns = [
  {
    title: "변수",
    dataIndex: "column1",
    key: "column1",
  },
  {
    title: "값",
    dataIndex: "column2",
    key: "column2",
  },
];

const CurrentStatusCard = ({ data }: { data: any[] }) => (
  <Card title="현재 상태" bordered={false}>
    <Table dataSource={data} columns={columns} pagination={false} />
  </Card>
);

const StandardEnvironmentCard = ({ data }: { data: any[] }) => (
  <Card title="표준 환경" bordered={false}>
    <Table dataSource={data} columns={columns} pagination={false} />
  </Card>
);

const Manage = () => {
  const [currentStatus, setCurrentStatus] = useState([]);
  const [standardEnvironment, setStandardEnvironment] = useState([]);

  useEffect(() => {
    // 현재 상태 데이터를 서버에서 불러오기
    axios.get("/api/current-status") // API 엔드포인트를 실제 서버 경로로 대체
      .then(response => {
        setCurrentStatus(response.data);
      })
      .catch(error => {
        console.error("Error fetchingcurrent status:", error);
      }); 

    // 표준 환경 데이터를 서버에서 불러오기
    axios.get("/api/standard-environment") // API 엔드포인트를 실제 서버 경로로 대체
      .then(response => {
        setStandardEnvironment(response.data);
      })
      .catch(error => {
        console.error("Error fetching standard environment:", error);
      });
  }, []);

  return (
    <>
      <Row style={{ marginBottom: "10px", textAlign: "center" }}>
        <Col span={4}>
          <ArrowLeftOutlined />
          <b style={{ color: gray[7] }}>1번 구역</b>
        </Col>
        <Col span={20}></Col>
      </Row>
      <Row style={{ marginBottom: "30px", textAlign: "center" }}>
        <Col span={4}>
          <h3>재배 환경</h3>
        </Col>
        <Col span={20}></Col>
      </Row>
      <Row
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Col span={3}></Col>
        <Col span={6}>
          <SmileOutlined style={{ fontSize: "90px", color: blue.primary }} />
        </Col>
        <Col span={6}>
          <MehOutlined style={{ fontSize: "90px", color: gray[6] }} />
        </Col>
        <Col span={6}>
          <FrownOutlined style={{ fontSize: "90px", color: red[4] }} />
        </Col>
        <Col span={3}></Col>
      </Row>
      <Row style={{ marginBottom: "10px", textAlign: "center" }}>
        <Col span={6}></Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <h1>물이 부족해요.</h1>
          <h3 style={{ color: gray.primary }}>
            물주기 버튼을 눌러서 물을 주세요.
          </h3>
        </Col>
        <Col span={6}></Col>
      </Row>
      <Row style={{ marginBottom: "30px", textAlign: "center" }}>
        <Col span={6}></Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button shape="circle" className="custom-large-button" icon={
            <RiWaterFlashLine style={{ fontSize: "60px", color: blue.primary }} />
          }></Button>
        </Col>
        <Col span={6}></Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <></>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <CurrentStatusCard data={currentStatus} />
        </Col>
        <Col span={12}>
          <StandardEnvironmentCard data={standardEnvironment} />
        </Col>
      </Row>
    </>
  );
};

export default Manage;
