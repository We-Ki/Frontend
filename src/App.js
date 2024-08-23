import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Analytics from "./pages/Analytics";
import Manage from "./pages/Manage";
import Menu from "./pages/Menu";
import SignIn from "./pages/SignIn";
import "./App.css";
import {
  HomeOutlined as HomeIcon,
  SunOutlined as ManageIcon,
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

const Demo = () => {
  const isLogin = useIsLoginState();
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "50px" }}>
          <IsLoginProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute authenticated={isLogin} component={<Home />} />
                }
              />
              <Route
                path="/manage"
                element={
                  <PrivateRoute
                    authenticated={isLogin}
                    component={<Manage />}
                  />
                }
              />
              <Route
                path="/menu"
                element={
                  <PrivateRoute authenticated={isLogin} component={<Menu />} />
                }
              />
              <Route
                path="/analytics"
                element={
                  <PrivateRoute
                    authenticated={isLogin}
                    component={<Analytics />}
                  />
                }
              />
              <Route
                path="/mypage"
                element={
                  <PrivateRoute
                    authenticated={isLogin}
                    component={<MyPage />}
                  />
                }
              />
              <Route
                path="*"
                element={
                  <PrivateRoute
                    authenticated={isLogin}
                    component={<NotFound />}
                  />
                }
              />
            </Routes>
          </IsLoginProvider>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center", position: "sticky", bottom: 0 }}>
          <Navigation menus={menus} />
        </Footer>
      </Layout>
    </Router>
  );
};

export default Demo;
