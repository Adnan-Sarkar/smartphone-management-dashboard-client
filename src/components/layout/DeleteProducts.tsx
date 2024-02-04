import React, { useState } from "react";
import { Button, Table, TableColumnsType } from "antd";
import DynamicHeader from "./DynamicHeader";
import {
  useDeleteProductsMutation,
  useGetAllProductsQuery,
} from "../../redux/features/product/productApi";
import { TProduct } from "../../types/product.types";
import toast from "react-hot-toast";

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
  const { data, isLoading } = useGetAllProductsQuery("");
  const [deleteProductsFromDB] = useDeleteProductsMutation();

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

  const deleteProducts = async () => {
    setLoading(true);
    const toastId = toast.loading("Deleting...");

    try {
      const response = await deleteProductsFromDB({
        idList: selectedRowKeys,
      }).unwrap();

      console.log(response);
      if (response?.statusCode !== 200) {
        throw new Error(response.data.message);
      }
      setLoading(false);
      toast.success("Products deleted Successfully", {
        id: toastId,
        duration: 1000,
      });
    } catch (err) {
      setLoading(false);
      toast.error("Something Went Wrong!", {
        id: toastId,
        duration: 1500,
      });
    }
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
            onClick={deleteProducts}
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
            pageSize: 6,
          }}
          loading={isLoading}
        />
      </div>
    </>
  );
};

export default DeleteProducts;
