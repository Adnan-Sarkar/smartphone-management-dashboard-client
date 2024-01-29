import Search from "antd/es/input/Search";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Button, Col, Divider, Drawer, Layout, Row } from "antd";
import FilterSidebar from "./FilterSidebar";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";

const ProductListFilter = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    // Handle the form submission here
    console.log("Search value:", data);
  };

  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <Row justify={"center"} align={"middle"}>
        <Col xs={20} sm={18} md={20} lg={20} xl={20}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="search"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Search
                  {...field}
                  placeholder="Search products"
                  allowClear
                  enterButton="Search"
                  size="large"
                />
              )}
            />
          </form>
        </Col>

        <Col xs={6} sm={4} md={4} lg={4} xl={2}>
          <Layout>
            <Sider
              width={"120px"}
              style={{
                backgroundColor: "#f1f2f6",
                padding: "20px 10px",
              }}
            >
              <Button type="primary" size="large" onClick={showDrawer}>
                Open Filter
              </Button>
            </Sider>

            <Drawer
              title="Filter Smartphones"
              placement="left"
              closable={true}
              onClose={onCloseDrawer}
              open={drawerVisible}
              width={300}
            >
              <FilterSidebar />
            </Drawer>
          </Layout>
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default ProductListFilter;
