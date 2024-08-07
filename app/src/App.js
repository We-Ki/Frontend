import React from 'react';
import { Layout, Segmented, Card, Col, Row  } from 'antd';
import { HomeOutlined, SunOutlined, MenuOutlined, LineChartOutlined, UserOutlined, SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/variables.less'; // 변경된 테마를 적용하기 위해 less 파일을 import


const { Meta } = Card;
const { Content, Footer } = Layout;

const Home = () => (
  <>
    <h1>관리</h1>
    <h3>한눈에 관리하는<br/> 나만의 농장</h3>
    <div style={{ display: 'flex', gap: '16px'  ,marginBottom: '10px' }}>
      <Card
        hoverable
        style={{ width: 220, height:200 }}
        cover={<img alt="example" src="plant.jpg" />}
      >
        <Meta title="1번 구역" description="상추 재배" />
      </Card>
      <Card
        hoverable
        style={{ width: 220, height:200 }}
        cover={<img alt="example" src="plant.jpg" />}
      >
        <Meta title="2번 구역" description="상추 재배" />
      </Card>
    </div>
    <div style={{ display: 'flex', gap: '16px' ,marginBottom: '10px' }}>
      <Card
        hoverable
        style={{ width: 220, height:200 }}
        cover={<img alt="example" src="plant.jpg" />}
      >
        <Meta title="3번 구역" description="상추 재배" />
      </Card>
      <Card
        hoverable
        style={{ width: 220, height:200 }}
        cover={<img alt="example" src="plant.jpg" />}
      >
        <Meta title="4번 구역" description="상추 재배" />
      </Card>
    </div>
    <div style={{ display: 'flex', gap: '16px' ,marginBottom: '10px' }}>
      <Card
        hoverable
        style={{ width: 220, height:200 }}
        cover={<img alt="example" src="plant.jpg" />}
      >
        <Meta title="5번 구역" description="상추 재배" />
      </Card>
      <Card
        hoverable
        style={{ width: 220, height:200 }}
        cover={<img alt="example" src="plant.jpg" />}
      >
        <Meta title="6번 구역" description="상추 재배" />
      </Card>
    </div>
  </>
);
const Manage = () => (
  <>
    <Row>
      <Col span={3}>col-3</Col>
      <Col span={6}>      <SmileOutlined style={{ fontSize: '100', color: '@red-5' }} /></Col>
      <Col span={6}><MehOutlined /></Col>
      <Col span={6}><FrownOutlined /></Col>
      <Col span={3}>col-3</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={12}>col-12</Col>
      <Col span={6}>col-6</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={12}>col-12</Col>
      <Col span={6}>col-6</Col>
    </Row>
    <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
  </>
);
const Menu = () => (
  <>
    <div>Menu Page</div>
  </>

);
const Analytics = () => (
  <>
    <div>Analytics Page</div>
  </>
);
const MyPage = () => (
  <>
    <div>My Page</div>
  </>
);

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
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 4 }}>
              <HomeOutlined style={{ fontSize: '18px', marginBottom: '-3px', marginTop: '8px' }} />
              <div>홈</div>
            </div>
          ),
          value: 'home',
        },
        {
          label: (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 4 }}>
              <SunOutlined style={{ fontSize: '18px', marginBottom: '-3px', marginTop: '8px' }} />
              <div>관리</div>
            </div>
          ),
          value: 'manage',
        },
        {
          label: (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 4 }}>
              <MenuOutlined style={{ fontSize: '18px', marginBottom: '-3px', marginTop: '8px' }} />
              <div>메뉴</div>
            </div>
          ),
          value: 'menu',
        },
        {
          label: (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 4 }}>
              <LineChartOutlined style={{ fontSize: '18px', marginBottom: '-3px', marginTop: '8px' }} />
              <div>분석</div>
            </div>
          ),
          value: 'analytics',
        },
        {
          label: (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 4 }}>
              <UserOutlined style={{ fontSize: '18px', marginBottom: '-3px', marginTop: '8px' }} />
              <div>마이</div>
            </div>
          ),
          value: 'mypage',
        },
      ]}
      block
      onChange={handleSegmentedChange}
    />
  );
};

const Demo = () => (
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '50px' }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Navigation />
      </Footer>
    </Layout>
  </Router>
);

export default Demo;
