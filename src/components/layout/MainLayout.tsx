import { ReactNode } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sidebar />
      <Layout>{children}</Layout>
    </Layout>
  );
};

export default MainLayout;
