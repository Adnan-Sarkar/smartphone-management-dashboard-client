import { Button, Space, Table, TableColumnsType } from "antd";
import DynamicHeader from "./DynamicHeader";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types/product.types";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import ProductUpdateModal from "./ProductUpdateModal";

const UpdateProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateProductInfo, setUpdateProductInfo] = useState<TProduct | null>(
    null
  );
  const { data, isLoading } = useGetAllProductsQuery("");

  const columns: TableColumnsType<TProduct> = [
    {
      title: "Image",
      dataIndex: "productImage",
      render: (text) => (
        <img
          src={text}
          alt={text}
          style={{
            width: 80,
            height: 80,
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      dataIndex: "update",
      render: (_, record) => (
        <Button
          onClick={() => handleUpdate(record)}
          type="text"
          style={{ background: "#f9ca24" }}
        >
          <Space direction="horizontal">
            <EditOutlined /> Update
          </Space>
        </Button>
      ),
    },
  ];

  let products = [];
  if (!isLoading && data) {
    products = data.data.map((product: TProduct) => {
      return {
        key: product._id,
        _id: product._id,
        productImage: product.productImage,
        name: product.name,
        quantity: product.quantity,
        model: product.model,
        price: product.price,
        releaseDate: product.releaseDate,
        brand: product.brand,
        battery: product.battery,
        rating: product.rating,
        chargingType: product.chargingType,
        weight: product.weight,
        details: product.details,
        camera: {
          front: product.camera.front,
          back: product.camera.back,
        },
        processor: {
          type: product.processor.type,
          speed: product.processor.speed,
        },
        screenSize: product.screenSize,
        storage: {
          ROM: product.storage.ROM,
          RAM: product.storage.RAM,
        },
        operatingSystem: product.operatingSystem,
      };
    });
  }

  const handleUpdate = (data: TProduct) => {
    setUpdateProductInfo(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <ProductUpdateModal
          isOpen={isModalOpen}
          handleCancel={handleCancel}
          product={updateProductInfo}
        />
      )}
      <DynamicHeader title="Update Products" />
      <div style={{ padding: "10px" }}>
        <Table
          columns={columns}
          dataSource={products}
          pagination={{
            position: ["bottomCenter"],
            pageSize: 6,
          }}
        />
      </div>
    </>
  );
};

export default UpdateProducts;
