import React from 'react';
import { Layout } from 'antd';
import { HomeOutlined, SunOutlined, MenuOutlined, LineChartOutlined, UserOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const { Content, Footer } = Layout;

const Home = () => <div>Home Page</div>;
const Manage = () => <div>Manage Page</div>;
const Menu = () => <div>Menu Page</div>;
const Analytics = () => <div>Analytics Page</div>;
const MyPage = () => <div>My Page</div>;

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
              <HomeOutlined style={{ fontSize: '24px', marginBottom: '4px' }} />
              <div>홈</div>
            </div>
          ),
          value: 'home',
        },
        {
          label: (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 4 }}>
              <SunOutlined style={{ fontSize: '24px', marginBottom: '4px' }} />
              <div>관리</div>
            </div>
          ),
          value: 'manage',
        },
        {
          label: (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 4 }}>
              <MenuOutlined style={{ fontSize: '24px', marginBottom: '4px' }} />
              <div>메뉴</div>
            </div>
          ),
          value: 'menu',
        },
        {
          label: (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 4 }}>
              <LineChartOutlined style={{ fontSize: '24px', marginBottom: '4px' }} />
              <div>분석</div>
            </div>
          ),
          value: 'analytics',
        },
        {
          label: (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 4 }}>
              <UserOutlined style={{ fontSize: '24px', marginBottom: '4px' }} />
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
