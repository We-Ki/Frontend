import React from "react";
import { Layout } from "antd";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Analytics from "./pages/Analytics";
import Manage from "./pages/Manage";
import Menu from "./pages/Menu";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./App.css";
import {
  HomeOutlined as HomeIcon,
  MenuOutlined as MenuIcon,
  LineChartOutlined as AnalyticsIcon,
  UserOutlined as MyPageIcon,
} from "@ant-design/icons";
import NotFound from "./pages/NotFound";
import { IsLoginProvider, useIsLoginState } from "./contexts/IsLoginContext";
import PrivateRoute from "./routes/PrivateRoute";

const { Content, Footer } = Layout;

const menus = [
  {
    name: "홈",
    value: "home",
    icon: HomeIcon,
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

const Demo = () => {
  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Content style={{ padding: "50px", overflow: "auto" }}>
          <IsLoginProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={<PrivateRoute component={<Home />} />}
              />
              <Route
                path="/manage/:farmId" // 농장의 ID를 URL에 포함
                element={<PrivateRoute component={<Manage />} />}
              />
              <Route
                path="/menu"
                element={<PrivateRoute component={<Menu />} />}
              />
              <Route
                path="/analytics"
                element={<PrivateRoute component={<Analytics />} />}
              />
              <Route
                path="/mypage"
                element={<PrivateRoute component={<MyPage />} />}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="*"
                element={<PrivateRoute component={<NotFound />} />}
              />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </IsLoginProvider>
        </Content>
        <Footer style={{ textAlign: "center", position: "sticky", bottom: 0 }}>
          <Navigation menus={menus} />
        </Footer>
      </Layout>
    </Router>
  );
};

export default Demo;
