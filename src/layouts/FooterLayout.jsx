import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

const { Content, Footer } = Layout;

const FooterLayout = ({ menus }) => (
  <Layout style={{ height: "100vh" }}>
    <Content style={{ padding: "50px", overflow: "auto" }}>
      <Outlet />
    </Content>
    <Footer style={{ textAlign: "center", position: "sticky", bottom: 0 }}>
      <Navigation menus={menus} />
    </Footer>
  </Layout>
);

export default FooterLayout;
