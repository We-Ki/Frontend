import React from 'react';
import { Layout, Segmented, Card,
         Col, Row, Table, Carousel,
        Divider, List, Avatar, Space, Button  } from 'antd';
import { HomeOutlined, SunOutlined, MenuOutlined, 
  LineChartOutlined, UserOutlined, SmileOutlined, 
  MehOutlined, FrownOutlined, ArrowLeftOutlined,
  VideoCameraOutlined, IdcardOutlined, DollarOutlined
   } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { RiWaterFlashLine } from "react-icons/ri";
import './App.css';

const { Meta } = Card;
const { Content, Footer } = Layout;

const CurrentStatus = [
  { key: '1', column1: '대기 온도', column2: '20°C' },
  { key: '2', column1: '토양 온도', column2: '15°C' },
  { key: '3', column1: '대기 습도', column2: '50%' },
  { key: '4', column1: '토양 습도', column2: '10%' },
  { key: '5', column1: '조명', column2: '3단계' },
  { key: '6', column1: '조명 지속 시간', column2: '16시간' },
];

const StandardEnvironment = [
  { key: '1', column1: '대기 온도', column2: '20°C' },
  { key: '2', column1: '토양 온도', column2: '15°C' },
  { key: '3', column1: '대기 습도', column2: '50%' },
  { key: '4', column1: '토양 습도', column2: '30%' },
  { key: '5', column1: '조명', column2: '3단계' },
  { key: '6', column1: '조명 지속 시간', column2: '16시간' },
];

const columns = [
  {
    title: '변수',
    dataIndex: 'column1',
    key: 'column1',
  },
  {
    title: '값',
    dataIndex: 'column2',
    key: 'column2',
  },
];

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


const CurrentStatusCard = () => (
  <Card title="현재 상태" bordered={false}>
    <Table dataSource={CurrentStatus} columns={columns} pagination={false} />
  </Card>
);

const StandardEnvironmentCard = () => (
  <Card title="표준 환경" bordered={false}>
    <Table dataSource={CurrentStatus} columns={columns} pagination={false} />
  </Card>
);



const Home = () => (
  <>
    <h1>홈</h1>
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
    <Row style={{ marginBottom: '10px',textAlign: 'center' }}>
      <Col span={4}><ArrowLeftOutlined /><b style={{color:'#595959'}}>1번 구역</b></Col>
      <Col span={20}></Col>
    </Row>
    <Row style={{ marginBottom: '30px',textAlign: 'center' }}>
    <Col span={4}><h3>재배 환경</h3></Col>
    <Col span={20}></Col>
    </Row>
    <Row style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center',textAlign: 'center' }} >
      <Col span={3}></Col>
      <Col span={6}><SmileOutlined style={{ fontSize: '90px', color:'#1677ff'}} /></Col>
      <Col span={6}><MehOutlined style={{ fontSize: '90px', color:'#8c8c8c'}}  /></Col>
      <Col span={6}><FrownOutlined style={{ fontSize: '90px', color:'#ff4d4f'}} /></Col>
      <Col span={3}></Col>
    </Row>
    <Row style={{marginBottom: '10px',textAlign: 'center'}}>
      <Col span={6}></Col>
      <Col span={12} style={{ textAlign: 'center' }}>
        <h1>물이 부족해요.</h1>
        <h3 style={{ color:'#bfbfbf'}}>물주기 버튼을 눌러서 물을 주세요.</h3>
      </Col>
      <Col span={6}></Col>
    </Row>
    <Row style={{marginBottom: '30px',textAlign: 'center'}}>
      <Col span={6}></Col>
      <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <RiWaterFlashLine style={{ fontSize: '90px', color: '#1677ff' }} />
      </Col>
      <Col span={6}></Col>
    </Row>
    <Row gutter={16}>
      <Col span={24}>
        <>
          <Carousel arrows infinite={false} style={{marginBottom: '10px'}}>
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
          <Carousel arrows dotPosition="left" infinite={false}  style={{marginBottom: '30px'}}>
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
        <CurrentStatusCard title="현재 상태" bordered={false}/></Col>
      <Col span={12}>
        <StandardEnvironmentCard title="표준 환경" bordered={false}/>
      </Col>
    </Row>
  </>
);
const Menu = () => (
  <>
    <Row style={{textAlign: 'left' }}>
      <Col span={4}><h1>전체</h1></Col>
      <Col span={20}></Col>
    </Row>
    <Row style={{ marginBottom: '30px',textAlign: 'left' }}>
    <Col span={8}><h3>메뉴 <br/> 바로 가기 </h3></Col>
    <Col span={16}></Col>
    </Row>
  </>

);

const point = [
  '물주기 - 1번 구역 물주기. 토양 습도 24%에서 27%로 상승!',
  '물주기 - 2번 구역 물주기. 토양 습도 24%에서 27%로 상승!',
  '물주기 - 3번 구역 물주기. 토양 습도 24%에서 27%로 상승!',
  '물주기 - 4번 구역 물주기. 토양 습도 24%에서 27%로 상승!',
  '물주기 - 5번 구역 물주기. 토양 습도 24%에서 27%로 상승!',
];

const data = [
  '1번 구역',
  '2번 구역',
  '3번 구역',
  '4번 구역',
  '5번 구역',
];

const mydata = [
  '기본 정보',
  '주소',
];

const Analytics = () => (
  <>
    <Row style={{textAlign: 'left' }}>
      <Col span={4}><h1>분석</h1></Col>
      <Col span={20}></Col>
    </Row>
    <Row style={{ marginBottom: '-10px',textAlign: 'left' }}>
    <Col span={8}><h3>데이터 분석을 통한 <br/> 똑똑한 농장 관리</h3></Col>
    <Col span={16}></Col>
    </Row>
    <Divider orientation="left" style={{ marginBottom: '0px',textAlign: 'left', color:'#595959'}}><h5><VideoCameraOutlined style={{marginRight:'5px'}} />실시간 카메라 보기</h5></Divider>
    <List 
      style={{backgroundColor:"white", border: 'none'}}
      //header={<div>Header</div>}
      //footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item style={{ fontWeight:'bold', color:'#595959', fontSize:'10px' }}>{item}</List.Item>}
    />
    <Divider orientation="left" style={{ marginBottom: '0px',textAlign: 'left', color:'#595959'}}><h5><LineChartOutlined style={{marginRight:'5px'}} />데이터 분석 및 보고서</h5></Divider>
    <List 
      style={{backgroundColor:"white", border: 'none'}}
      //header={<div>Header</div>}
      //footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item style={{ fontWeight:'bold', color:'#595959', fontSize:'10px' }}>{item}</List.Item>}
    />
  </>
);
const MyPage = () => (
  <>
    <Row style={{textAlign: 'left' }}>
      <Col span={4}><h1>마이</h1></Col>
      <Col span={20}></Col>
    </Row>
    <Row style={{ marginBottom: '10px',textAlign: 'left' }}>
    <Col span={8}><h3> 포인트를 모으고 <br/> 농작물을 키우자! </h3></Col>
    <Col span={16}></Col>
    </Row>
    <Row style={{ marginBottom: '20px', textAlign: 'left' }}>
      <Col span={4}><Avatar size={64} icon={<UserOutlined />} /></Col>
      <Col span={4} ><br/><b>김위키</b></Col>
      <Col span={16}></Col>
    </Row>
    <Row gutter={10}>
      <Col span={12}>
        <Card style={cardStyle}><b>회원구분</b></Card>
      </Col>
      <Col span={12} >
        <Card style={cardStyle}><b>일반</b></Card>
      </Col>
    </Row>
    <Divider orientation="left" style={{ marginBottom: '0px',textAlign: 'left', color:'#595959'}}><h5><IdcardOutlined style={{marginRight:'5px'}} />내 정보</h5></Divider>
    <List 
      style={{backgroundColor:"white", border: 'none'}}
      //header={<div>Header</div>}
      //footer={<div>Footer</div>}
      bordered
      dataSource={mydata}
      renderItem={(item) => <List.Item style={{ fontWeight:'bold', color:'#595959', fontSize:'10px' }}>{item}</List.Item>}
    />
    <div style={{marginTop:'30px'}}></div>
    <Card style={bigCardStyle}><b>내 포인트</b><br/><h2>13000포인트</h2></Card>
    <Divider orientation="left" style={{ marginBottom: '0px',textAlign: 'left', color:'#595959'}}><h5><DollarOutlined style={{marginRight:'5px'}} />포인트 적립 내역</h5></Divider>
    <List 
      style={{backgroundColor:"white", border: 'none'}}
      //header={<div>Header</div>}
      //footer={<div>Footer</div>}
      bordered
      dataSource={point}
      renderItem={(item) => <List.Item style={{ fontWeight:'bold', color:'#595959', fontSize:'10px' }}>{item}</List.Item>}
    />
  </>
);

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  height: '50px', // 카드 높이를 원하는 크기로 설정
  textAlign: 'left',
  color:'#595959', 
  fontSize:'10px',
};

const bigCardStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  height: '100px', // 카드 높이를 원하는 크기로 설정
  textAlign: 'left',
  color:'#595959', 
  fontSize:'10px',
};

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
              <div>전체</div>
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