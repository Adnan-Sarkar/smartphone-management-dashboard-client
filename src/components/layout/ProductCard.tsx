import { Card, Col, Rate, Row, Space } from "antd";
import { CopyOutlined, DollarOutlined, EyeOutlined } from "@ant-design/icons";
import { TProduct } from "../../types/product.types";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  handleDetailsClick,
}: {
  product: TProduct;
  handleDetailsClick: () => void;
}) => {
  const navigate = useNavigate();

  const handleSellClick = () => {
    // Handle the "Sell" button click
    console.log("Sell button clicked");
  };

  const handleDuplicateClick = () => {
    navigate("/duplicate-product", {
      state: {
        productInfo: product,
      },
    });
  };

  return (
    <Card
      style={{ paddingTop: "10px", width: "300px" }}
      cover={
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            alt={product.name}
            src={product.productImage}
            style={{ width: "150px", height: "200px", objectFit: "cover" }}
          />
        </div>
      }
      actions={[
        <div key="Details" onClick={handleDetailsClick}>
          <Space direction="horizontal">
            <EyeOutlined />
            Details
          </Space>
        </div>,
        <div key="Sell" onClick={handleSellClick}>
          <Space direction="horizontal">
            <DollarOutlined />
            Sell
          </Space>
        </div>,
        <div key="Duplicate" onClick={handleDuplicateClick}>
          <Space direction="horizontal">
            <CopyOutlined />
            Duplicate
          </Space>
        </div>,
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
  );
};

export default ProductCard;
