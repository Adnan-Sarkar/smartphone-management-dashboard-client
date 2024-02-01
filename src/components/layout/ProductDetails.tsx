import { Col, Rate, Row, Table } from "antd";
import { useGetProductByIdQuery } from "../../redux/features/product/productApi";
import { useAppSelector } from "../../redux/hooks";
import { TProduct } from "../../types/product.types";
import { ReactNode, useEffect, useState } from "react";

type TDataSource = {
  topic: string;
  description: string | number | ReactNode;
  key: string;
};

const ProductDetails = () => {
  const productId = useAppSelector((state) => state.modal.productId);
  const { data, isLoading } = useGetProductByIdQuery(productId);
  const [product, setProduct] = useState<TProduct | null>(null);
  const [dataSource, setDataSource] = useState<TDataSource[] | []>([]);

  useEffect(() => {
    if (data?.data) {
      setProduct(data.data);
    }

    if (product) {
      setDataSource([
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
      ]);
    }
  }, [product, data]);

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
    <div>
      <Row>
        <Col span={24}>
          <img
            src={product?.productImage}
            alt={product?.name}
            style={{ width: "150px" }}
          />
        </Col>
        <Col span={24}>
          <h2 style={{ marginBottom: "5px" }}>{product?.name}</h2>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
            loading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
