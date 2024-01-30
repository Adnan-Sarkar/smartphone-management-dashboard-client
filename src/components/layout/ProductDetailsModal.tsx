import { Col, Modal, Rate, Row, Table } from "antd";
import { TProduct } from "../../types/product.types";

const ProductDetailsModal = ({
  product,
  isOpen,
  handleCancel,
}: {
  product: TProduct;
  isOpen: boolean;
  handleCancel: () => void;
}) => {
  const dataSource = [
    { topic: "Price", description: product.price, key: "Price" },
    { topic: "Quantity", description: product.quantity, key: "Quantity" },
    { topic: "Brand", description: product.brand, key: "Brand" },
    { topic: "Model", description: product.model, key: "Model" },
    {
      topic: "Release Date",
      description: product.releaseDate,
      key: "Release Date",
    },
    {
      topic: "Operating System",
      description: product.operatingSystem,
      key: "Operating System",
    },
    { topic: "Battery", description: product.battery, key: "Battery" },
    {
      topic: "Front Camera",
      description: product.camera.front,
      key: "Front Camera",
    },
    {
      topic: "Back Camera",
      description: product.camera.back,
      key: "Back Camera",
    },
    {
      topic: "Processor Type",
      description: product.processor.type,
      key: "Processor Type",
    },
    {
      topic: "Processor Speed",
      description: product.processor.speed,
      key: "Processor Speed",
    },
    { topic: "RAM", description: product.storage.RAM, key: "RAM" },
    { topic: "ROM", description: product.storage.ROM, key: "ROM" },
    {
      topic: "Rating",
      description: <Rate disabled defaultValue={product.rating} />,
      key: "Rating",
    },
    { topic: "Details", description: product.details, key: "Details" },
  ];

  const columns = [
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      width: "35%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <Modal open={isOpen} onCancel={handleCancel} onOk={handleCancel}>
      <div>
        <Row>
          <Col span={24}>
            <img
              src={product.productImage}
              alt={product.name}
              style={{ width: "150px" }}
            />
          </Col>
          <Col span={24}>
            <h2 style={{ marginBottom: "5px" }}>{product.name}</h2>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              bordered
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
