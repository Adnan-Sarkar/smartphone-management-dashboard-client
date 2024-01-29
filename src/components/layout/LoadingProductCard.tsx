import { Card, Col, Row, Rate, Skeleton } from "antd";
import { EyeOutlined, DollarOutlined, CopyOutlined } from "@ant-design/icons";

const LoadingProductCard = () => (
  <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
    <Card
      style={{ width: 300 }}
      actions={[
        <EyeOutlined key="Details" />,
        <DollarOutlined key="Sell" />,
        <CopyOutlined key="Duplicate" />,
      ]}
    >
      <Skeleton loading={true} avatar active>
        <div>
          <h2 style={{ marginBottom: "5px" }}>Product Name</h2>
          <Row style={{ marginBottom: "5px" }}>
            <Col span={12}>
              <p style={{ fontSize: "16px" }}>Price: Loading</p>
            </Col>
            <Col span={12}>
              <p style={{ fontSize: "16px" }}>Quantity: Loading</p>
            </Col>
          </Row>
          <Row style={{ marginBottom: "5px" }}>
            <Col span={24}>Brand: Loading</Col>
          </Row>
          <Row style={{ marginBottom: "5px" }}>
            <Col span={24}>Model: Loading</Col>
          </Row>
          <Row style={{ marginBottom: "5px" }}>
            <Col span={24}>Release Date: Loading</Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col span={24}>
              <Rate disabled defaultValue={0} />
            </Col>
          </Row>
        </div>
      </Skeleton>
    </Card>
  </Col>
);

export default LoadingProductCard;
