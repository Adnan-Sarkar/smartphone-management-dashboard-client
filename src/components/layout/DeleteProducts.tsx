import React, { useState } from "react";
import { Button, Table, TableColumnsType } from "antd";
import DynamicHeader from "./DynamicHeader";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types/product.types";

interface DataType {
  key: React.Key;
  image: string;
  name: string;
  quantity: number;
  price: number;
  releaseDate: string;
  brand: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Image",
    dataIndex: "image",
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
];

const DeleteProducts = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useGetProductsQuery("");

  let products = [];
  if (!isLoading && data) {
    products = data.data.map((product: TProduct) => {
      return {
        key: product._id,
        image: product.productImage,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        releaseDate: product.releaseDate,
        brand: product.brand,
      };
    });
  }

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <DynamicHeader title="Delete Products" />
      <div style={{ padding: "10px" }}>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            size="large"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
            danger
          >
            Delete Products
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={products}
          pagination={{
            position: ["bottomCenter"],
            pageSize: 10,
          }}
        />
      </div>
    </>
  );
};

export default DeleteProducts;
