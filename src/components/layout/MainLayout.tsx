import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sidebar />
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
