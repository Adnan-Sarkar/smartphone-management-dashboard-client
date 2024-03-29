import { Card, Col, Rate, Row, Space } from "antd";
import { CopyOutlined, DollarOutlined, EyeOutlined } from "@ant-design/icons";
import { TProduct } from "../../types/product.types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { modalOpen } from "../../redux/features/modal/modalSlice";
import { userRoles } from "../../constant/userRoles";

const ProductCard = ({ product }: { product: TProduct }) => {
  const { role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDuplicateClick = () => {
    navigate(`/${role}/duplicate-product`, {
      state: {
        productInfo: product,
      },
    });
  };

  const handleProductDetails = () => {
    dispatch(
      modalOpen({
        productId: product._id,
        modalFor: "productDetails",
      })
    );
  };

  const handleProductSell = () => {
    dispatch(
      modalOpen({
        productId: product._id,
        modalFor: "productSell",
        productQuantity: product.quantity,
      })
    );
  };

  // set role based actions
  const productDetailsAction = (
    <div key="Details" onClick={handleProductDetails}>
      <Space direction="horizontal">
        <EyeOutlined />
        Details
      </Space>
    </div>
  );

  const productSellAction = (
    <div key="Sell" onClick={handleProductSell}>
      <Space direction="horizontal">
        <DollarOutlined />
        Sell
      </Space>
    </div>
  );

  const productDuplicateAction = (
    <div key="Duplicate" onClick={handleDuplicateClick}>
      <Space direction="horizontal">
        <CopyOutlined />
        Duplicate
      </Space>
    </div>
  );

  const productCardActions = [];

  if (role === userRoles.SUPERADMIN) {
    productCardActions.push(productDetailsAction);
    productCardActions.push(productSellAction);
    productCardActions.push(productDuplicateAction);
  } else if (role === userRoles.MANAGER) {
    productCardActions.push(productDetailsAction);
    productCardActions.push(productDuplicateAction);
  } else if (role === userRoles.SELLER) {
    productCardActions.push(productDetailsAction);
    productCardActions.push(productSellAction);
  }

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
      actions={productCardActions}
    >
      <div>
        <h2
          style={{ marginBottom: "5px", height: "70px", textAlign: "center" }}
        >
          {product.name}
        </h2>
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
            <Rate disabled defaultValue={product.rating} allowHalf />
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default ProductCard;
