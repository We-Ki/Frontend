import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Analytics from "./pages/Analytics";
import Manage from "./pages/Manage";
import Menu from "./pages/Menu";
import "./App.css";

const { Content, Footer } = Layout;

const Demo = () => (
  <Router>
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "50px" }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <Navigation />
      </Footer>
    </Layout>
  </Router>
);

export default Demo;
