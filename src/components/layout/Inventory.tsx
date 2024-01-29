import { Layout } from "antd";
import DynamicHeader from "./DynamicHeader";
import ProductsList from "./ProductsList";

const { Content } = Layout;

const Inventory = () => {
  return (
    <>
      <DynamicHeader title="Inventory" />
      <Content>
        <ProductsList />
      </Content>
    </>
  );
};

export default Inventory;
