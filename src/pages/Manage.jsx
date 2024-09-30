import React from "react";
import { Row, Col, Carousel, Card, Table, Button } from "antd";
import { gray, blue, red } from "@ant-design/colors";
import {
  ArrowLeftOutlined,
  SmileOutlined,
  MehOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import { RiWaterFlashLine } from "react-icons/ri";

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "white",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const CurrentStatus = [
  { key: "1", column1: "대기 온도", column2: "20°C" },
  { key: "2", column1: "토양 온도", column2: "15°C" },
  { key: "3", column1: "대기 습도", column2: "50%" },
  { key: "4", column1: "토양 습도", column2: "10%" },
  { key: "5", column1: "조명", column2: "3단계" },
  { key: "6", column1: "조명 지속 시간", column2: "16시간" },
];

const StandardEnvironment = [
  { key: "1", column1: "대기 온도", column2: "20°C" },
  { key: "2", column1: "토양 온도", column2: "15°C" },
  { key: "3", column1: "대기 습도", column2: "50%" },
  { key: "4", column1: "토양 습도", column2: "30%" },
  { key: "5", column1: "조명", column2: "3단계" },
  { key: "6", column1: "조명 지속 시간", column2: "16시간" },
];

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

const CurrentStatusCard = () => (
  <Card title="현재 상태" bordered={false}>
    <Table dataSource={CurrentStatus} columns={columns} pagination={false} />
  </Card>
);

const StandardEnvironmentCard = () => (
  <Card title="표준 환경" bordered={false}>
    <Table
      dataSource={StandardEnvironment}
      columns={columns}
      pagination={false}
    />
  </Card>
);

const Manage = () => (
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
        <>
          <Carousel arrows infinite={false} style={{ marginBottom: "10px" }}>
            <div>
              <h3 style={contentStyle}>조명 1단계</h3>
            </div>
            <div>
              <h3 style={contentStyle}>조명 2단계</h3>
            </div>
            <div>
              <h3 style={contentStyle}>조명 3단계</h3>
            </div>
            <div>
              <h3 style={contentStyle}>조명 4단계</h3>
            </div>
          </Carousel>
          <br />
          <Carousel
            arrows
            dotPosition="left"
            infinite={false}
            style={{ marginBottom: "30px" }}
          >
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <CurrentStatusCard title="현재 상태" bordered={false} />
      </Col>
      <Col span={12}>
        <StandardEnvironmentCard title="표준 환경" bordered={false} />
      </Col>
    </Row>
  </>
);

export default Manage;
