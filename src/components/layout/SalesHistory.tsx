import { Divider, Select, Table, TableColumnsType } from "antd";
import { useSellsHistoryQuery } from "../../redux/features/product/productApi";
import DynamicHeader from "./DynamicHeader";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { TColumn, TRowSaleData, TSaleData } from "../../types/product.types";
import { v4 as uuidv4 } from "uuid";
const { Content } = Layout;

interface ExpandedDataType {
  productImage: string;
  productName: string;
  buyerName: string;
  quantity: number;
  totalPrice: number;
  saleDate: string;
}

const options = [
  { value: "daily", label: <span>Daily Sales History</span> },
  { value: "weekly", label: <span>Weekly Sales History</span> },
  { value: "monthly", label: <span>Monthly Sales History</span> },
  { value: "yearly", label: <span>Yearly Sales History</span> },
];

const SalesHistory = () => {
  const [slaesHistoryType, setSlaesHistoryType] = useState("daily");
  const { data, isLoading, isFetching } =
    useSellsHistoryQuery(slaesHistoryType);
  const [salesInfo, setSalesInfo] = useState<TColumn[]>();

  useEffect(() => {
    if (data && !isLoading && !isFetching) {
      const salesinfoArr = data.data.map((sale: TSaleData) => {
        let formattedDate;

        if (slaesHistoryType === "daily") {
          formattedDate = dayjs(
            `${sale._id.year}-${sale._id.month}-${sale._id.day}`
          ).format("dddd, MMMM D, YYYY");
        } else if (slaesHistoryType === "weekly") {
          formattedDate = `Week number: ${sale._id.week}`;
        } else if (slaesHistoryType === "monthly") {
          formattedDate = dayjs(`${sale._id.year}-${sale._id.month}`).format(
            "MMMM YYYY"
          );
        } else if (slaesHistoryType === "yearly") {
          formattedDate = `Year: ${sale._id.year.toString()}`;
        }

        return {
          key: uuidv4(),
          week: formattedDate,
          totalSale: sale.totalSale,
          sales: sale.sales,
        };
      });

      setSalesInfo(salesinfoArr as TColumn[]);
    }
  }, [data, isLoading, slaesHistoryType, isFetching]);

  const expandedRowRender = (record: TSaleData) => {
    const nestedRowColumns: TableColumnsType<ExpandedDataType> = [
      {
        title: "Image",
        dataIndex: "productImage",
        render: (_, nestedRecord) => (
          <img
            src={nestedRecord.productImage}
            alt={nestedRecord.productName}
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

    const dataSource: TRowSaleData[] = [];

    if (record?.sales?.length > 0) {
      record?.sales?.forEach((sale) => {
        dataSource.push({
          key: uuidv4(),
          quantity: sale.quantity,
          buyerName: sale.buyerName,
          saleDate: sale.saleDate,
          productImage: sale.product[0].productImage,
          productName: sale.product[0].name,
          totalPrice: sale.product[0].price * sale.quantity,
        });
      });
    }

    return (
      <Table
        columns={nestedRowColumns}
        dataSource={dataSource}
        pagination={false}
      />
    );
  };

  // Define the table data
  const tableData: TColumn[] = [];

  // Populate tableData based on salesInfo
  if (salesInfo && !isLoading) {
    salesInfo.forEach((sales) => {
      tableData.push({
        key: sales.key,
        week: sales.week,
        totalSale: sales.totalSale,
        sales: sales.sales,
      });
    });
  }

  const columns: TableColumnsType<TColumn> = [
    {
      title: `${slaesHistoryType.toUpperCase()} SALES`,
      dataIndex: "week",
      key: "week",
    },
    { title: "TOTAL SALES", dataIndex: "totalSale", key: "totalSale" },
  ];

  const handleSalesHistoryType = (data: string) => {
    setSlaesHistoryType(data);
  };

  return (
    <>
      <DynamicHeader title="Sales History" />
      <Content style={{ padding: "10px" }}>
        <div>
          <Select
            popupMatchSelectWidth={false}
            options={options}
            placeholder="Select Sales History Type"
            onChange={handleSalesHistoryType}
          />
        </div>
        <Divider />
        <Table
          columns={columns}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
          dataSource={tableData}
          loading={isLoading && isFetching}
          pagination={{
            position: ["bottomCenter"],
            pageSize: 6,
          }}
        />
      </Content>
    </>
  );
};

export default SalesHistory;
