import { Card, Col, Rate, Row } from "antd";
import { CopyOutlined, DollarOutlined, EyeOutlined } from "@ant-design/icons";
import { TProduct } from "../../types/product.types";

const ProductCard = ({
  product,
  handleDetailsClick,
}: {
  product: TProduct;
  handleDetailsClick: () => void;
}) => {
  const handleSellClick = () => {
    // Handle the "Sell" button click
    console.log("Sell button clicked");
  };

  const handleDuplicateClick = () => {
    // Handle the "Duplicate" button click
    console.log("Duplicate button clicked");
  };

  return (
    <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
      <Card
        style={{ width: 300, paddingTop: "10px" }}
        cover={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              alt={product.name}
              src={product.productImage}
              style={{ width: "150px" }}
            />
          </div>
        }
        actions={[
          <EyeOutlined key="Details" onClick={handleDetailsClick} />,
          <DollarOutlined key="Sell" onClick={handleSellClick} />,
          <CopyOutlined key="Duplicate" onClick={handleDuplicateClick} />,
        ]}
      >
        <div>
          <h2 style={{ marginBottom: "5px" }}>{product.name}</h2>
          <Row style={{ marginBottom: "5px" }}>
            <Col span={12}>
              <p style={{ fontSize: "16px" }}>Price: {product.price}</p>
            </Col>
            <Col span={12}>
              <p style={{ fontSize: "16px" }}>Quantity: {product.quantity}</p>
            </Col>
          </Row>
          <Row style={{ marginBottom: "5px" }}>
            <Col span={24}>Brand: {product.brand}</Col>
          </Row>
          <Row style={{ marginBottom: "5px" }}>
            <Col span={24}>Model: {product.model}</Col>
          </Row>
          <Row style={{ marginBottom: "5px" }}>
            <Col span={24}>Release Date: {product.releaseDate}</Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col span={24}>
              <Rate disabled defaultValue={product.rating} />
            </Col>
          </Row>
        </div>
      </Card>
    </Col>
  );
};

export default ProductCard;
