import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const DefaultLayout = () => (
  <Layout style={{ height: "100vh" }}>
    <Content style={{ padding: "50px", overflow: "auto" }}>
      <Outlet />
    </Content>
  </Layout>
);

export default DefaultLayout;
