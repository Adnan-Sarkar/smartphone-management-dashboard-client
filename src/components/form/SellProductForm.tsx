import { useForm, Controller, FieldValues } from "react-hook-form";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Button,
  Space,
  Divider,
} from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useSellProductMutation } from "../../redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { modalClose } from "../../redux/features/modal/modalSlice";

const SellProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sellProduct] = useSellProductMutation();
  const { productId, productQuantity } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      quantity: 1,
      buyerName: "",
      saleDate: dayjs(),
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Selling...");
    setIsLoading(true);

    const { quantity, buyerName, saleDate } = data;

    if (quantity && buyerName && saleDate) {
      try {
        // Perform the sale logic here
        const response = await sellProduct({
          productId,
          quantity,
          buyerName,
          saleDate: `${saleDate.$y}-${saleDate.$M + 1}-${saleDate.$D}`,
        }).unwrap();

        // Handle the sale success or error
        if (response?.statusCode !== 201) {
          throw new Error(response.data.message);
        }

        setIsLoading(false);

        toast.success("Product Sold Successfully", {
          id: toastId,
          duration: 1000,
        });

        dispatch(modalClose());

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setIsLoading(false);

        if (err?.status) {
          toast.error(err.data.message, {
            id: toastId,
            duration: 1000,
          });
        } else {
          toast.error(err.message, {
            id: toastId,
            duration: 1000,
          });
        }
      }
    } else {
      toast.error("Please Provide Every Information!", {
        id: toastId,
        duration: 1000,
      });
    }
  };

  // custom date format
  const dateFormat = "YYYY-MM-DD";

  return (
    <>
      <div>
        <h2>Sell Product</h2>
      </div>
      <Divider />
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label="Buyer Name" name="buyerName">
              <Controller
                name="buyerName"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Sale Quantity" name="quantity">
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    style={{ width: "100%" }}
                    min={1}
                    max={productQuantity}
                  />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Sale Date" name="saleDate">
              <Controller
                name="saleDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    style={{ width: "100%" }}
                    format={dateFormat}
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  disabled={isLoading}
                  loading={isLoading}
                >
                  <DollarOutlined /> Sell Confirm
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SellProductForm;
