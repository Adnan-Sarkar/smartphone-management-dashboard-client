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
    { topic: "Price", description: product.price },
    { topic: "Quantity", description: product.quantity },
    { topic: "Brand", description: product.brand },
    { topic: "Model", description: product.model },
    { topic: "Release Date", description: product.releaseDate },
    { topic: "Operating System", description: product.operatingSystem },
    { topic: "Battery", description: product.battery },
    { topic: "Front Camera", description: product.camera.front },
    { topic: "Back Camera", description: product.camera.back },
    { topic: "Processor Type", description: product.processor.type },
    { topic: "Processor Speed", description: product.processor.speed },
    { topic: "RAM", description: product.storage.RAM },
    { topic: "ROM", description: product.storage.ROM },
    {
      topic: "Rating",
      description: <Rate disabled defaultValue={product.rating} />,
    },
    { topic: "Details", description: product.details },
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
