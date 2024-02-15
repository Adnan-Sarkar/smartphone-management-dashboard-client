import { Button, Divider, Select, Space, Table, TableColumnsType } from "antd";
import { useSellsHistoryQuery } from "../../redux/features/product/productApi";
import DynamicHeader from "./DynamicHeader";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { TSalesTableData } from "../../types/product.types";
import { DownloadOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { generateInvoicePDF } from "../../utils/generateInvoicePDF";
const { Content } = Layout;

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
  const [salesInfo, setSalesInfo] = useState<TSalesTableData[]>();

  useEffect(() => {
    if (data && !isLoading && !isFetching) {
      const salesinfoArr = data.data.map((sale: TSalesTableData) => {
        let formattedDate;

        if (slaesHistoryType === "daily" && sale._id) {
          formattedDate = dayjs(
            `${sale._id.year}-${sale._id.month}-${sale._id.day}`
          ).format("dddd, MMMM D, YYYY");
        } else if (slaesHistoryType === "weekly" && sale._id) {
          formattedDate = `Week number: ${sale._id.week}`;
        } else if (slaesHistoryType === "monthly" && sale._id) {
          formattedDate = dayjs(`${sale._id.year}-${sale._id.month}`).format(
            "MMMM YYYY"
          );
        } else if (slaesHistoryType === "yearly" && sale._id) {
          formattedDate = `Year: ${sale._id.year.toString()}`;
        }

        return {
          key: uuidv4(),
          week: formattedDate,
          totalSale: sale.totalSale,
          sales: sale.sales,
        };
      });

      setSalesInfo(salesinfoArr as TSalesTableData[]);
    }
  }, [data, isLoading, slaesHistoryType, isFetching]);

  // handle download invoice pdf
  const handleDownloadInvoice = (saleProductInfo: TSalesTableData) => {
    const { buyerName, saleDate, productName, price, quantity } =
      saleProductInfo;

    // give type assertion to they are not undefined
    if (buyerName && saleDate && productName && quantity && price) {
      // generate invoice PDF based on sale info
      generateInvoicePDF(buyerName, saleDate, productName, quantity, price);
    }
  };

  const expandedRowRender = (record: TSalesTableData) => {
    const nestedRowColumns: TableColumnsType<TSalesTableData> = [
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
      {
        title: "Invoice Download",
        dataIndex: "invoice",
        render: (_, record) => (
          <Button
            onClick={() => handleDownloadInvoice(record)}
            type="text"
            style={{ background: "#f9ca24" }}
          >
            <Space direction="horizontal">
              <DownloadOutlined /> Download Invoice
            </Space>
          </Button>
        ),
      },
    ];

    const dataSource: TSalesTableData[] = [];

    if (record?.sales) {
      if (record?.sales?.length > 0) {
        record?.sales?.forEach((sale) => {
          dataSource.push({
            key: uuidv4(),
            quantity: sale.quantity,
            buyerName: sale.buyerName,
            saleDate: sale.saleDate,
            productImage: sale.productImage,
            productName: sale.productName,
            totalPrice: sale.productPrice * sale.quantity,
            price: sale.productPrice,
          });
        });
      }
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
  const tableData: TSalesTableData[] = [];

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

  const columns: TableColumnsType<TSalesTableData> = [
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
            pageSize: 12,
          }}
        />
      </Content>
    </>
  );
};

export default SalesHistory;
