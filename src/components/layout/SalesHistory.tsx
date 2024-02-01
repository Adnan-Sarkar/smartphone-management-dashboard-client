import { Divider, Select, Table, TableColumnsType } from "antd";
import { TSaleProduct, TSales } from "../../types/product.types";
import { useSellsHistoryQuery } from "../../redux/features/product/productApi";
import DynamicHeader from "./DynamicHeader";
import { Layout } from "antd";
import { useState } from "react";
const { Content } = Layout;

const columns: TableColumnsType<TSales> = [
  {
    title: "Image",
    dataIndex: "productImage",
    render: (text) => (
      <img
        src={text}
        alt={text}
        style={{
          width: 100,
          height: 100,
          objectFit: "cover",
        }}
      />
    ),
  },
  {
    title: "Product Name",
    dataIndex: "productName",
  },
  {
    title: "Buyer Name",
    dataIndex: "buyerName",
  },
  {
    title: "Date",
    dataIndex: "saleDate",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
  },
];

const options = [
  { value: "daily", label: <span>Daily</span> },
  { value: "weekly", label: <span>Weekly</span> },
  { value: "monthly", label: <span>Monthly</span> },
  { value: "yearly", label: <span>Yearly</span> },
];

const SalesHistory = () => {
  const [slaesHistoryType, setSlaesHistoryType] = useState("daily");
  const { data, isLoading } = useSellsHistoryQuery(slaesHistoryType);
  console.log(data);

  let salesProducts = [];

  if (data?.data && !isLoading) {
    salesProducts = data.data.map((saleProduct: TSaleProduct) => {
      return {
        key: saleProduct._id,
        productImage: saleProduct.product[0].productImage,
        productName: saleProduct.product[0].name,
        buyerName: saleProduct.buyerName,
        saleDate: saleProduct.saleDate,
        quantity: saleProduct.quantity,
        totalPrice: saleProduct.product[0].price * saleProduct.quantity,
      };
    });
  }

  const handleSalesHistoryType = (data: string) => {
    setSlaesHistoryType(data);
  };

  return (
    <>
      <DynamicHeader title="Sales History" />
      <Content style={{ padding: "10px" }}>
        <div>
          <Select
            options={options}
            placeholder="Select Sales History Type"
            onChange={handleSalesHistoryType}
          />
        </div>
        <Divider />
        <Table
          columns={columns}
          dataSource={salesProducts}
          loading={isLoading}
          pagination={{
            position: ["bottomCenter"],
            pageSize: 10,
          }}
        />
      </Content>
    </>
  );
};

export default SalesHistory;
