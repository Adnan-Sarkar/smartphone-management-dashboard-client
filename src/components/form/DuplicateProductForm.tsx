import { useForm, Controller, FieldValues } from "react-hook-form";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Space,
  Rate,
  Upload,
  DatePicker,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import toast from "react-hot-toast";
import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import DynamicHeader from "../layout/DynamicHeader";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { StorageSizesArray } from "../../constant/storageSize.constant";
import { useAppSelector } from "../../redux/hooks";

const DuplicateProductForm = () => {
  const { role } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const location = useLocation();
  const product = location.state?.productInfo;
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm({
    defaultValues:
      {
        battery: product.battery,
        brand: product.brand,
        camera: { ...product.camera },
        chargingType: product.chargingType,
        details: product.details,
        model: product.model,
        name: product.name,
        operatingSystem: product.operatingSystem,
        price: product.price,
        processor: { ...product.processor },
        productImage: undefined,
        quantity: product.quantity,
        rating: product.rating,
        releaseDate: dayjs(product.releaseDate, {
          format: "YYYY-MM-DD",
        }),
        screenSize: product.screenSize,
        storage: { ...product.storage },
        weight: product.weight,
      } || {},
  });

  const onSubmit = async (data: FieldValues) => {
    // Handle form submission logic here
    console.log(data);

    setIsLoading(true);
    const toastId = toast.loading("Uploading...");

    const {
      battery,
      brand,
      camera,
      chargingType,
      details,
      model,
      name,
      operatingSystem,
      price,
      processor,
      productImage,
      quantity,
      rating,
      releaseDate,
      screenSize,
      storage,
      weight,
    } = data;

    if (
      battery &&
      brand &&
      camera &&
      chargingType &&
      details &&
      model &&
      name &&
      operatingSystem &&
      price &&
      processor &&
      productImage &&
      quantity &&
      rating &&
      releaseDate &&
      screenSize &&
      storage &&
      weight
    ) {
      // send product image to cloudinary and get the hosted url
      const imageUrl = await sendImageToCloudinary(productImage.file);

      try {
        const response = await createProduct({
          battery,
          brand,
          camera,
          chargingType,
          details,
          model,
          name,
          operatingSystem,
          price,
          processor,
          productImage: imageUrl,
          quantity,
          rating,
          releaseDate: `${releaseDate.$y}-${releaseDate.$M + 1}-${
            releaseDate.$D
          }`,
          screenSize,
          storage,
          weight,
        }).unwrap();

        // check registration is successfull or not
        if (response?.statusCode !== 201) {
          throw new Error(response.data.message);
        }

        // dispatch(addProducts());

        // check registration is successfull or not
        if (response?.statusCode !== 201) {
          throw new Error(response.data.message);
        }

        setIsLoading(false);

        toast.success("New Product Added Successfully", {
          id: toastId,
          duration: 1000,
        });

        navigate(`/${role}/inventory`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setIsLoading(false);
        toast.error("Something Went wrong! Try again", {
          id: toastId,
          duration: 1000,
        });
      }
    } else {
      setIsLoading(false);
      toast.error("Please provide every information!", {
        id: toastId,
        duration: 1500,
      });
    }
  };

  // custom date format
  const dateFormat = "YYYY-MM-DD";

  return (
    <>
      <>
        <DynamicHeader title="Duplicate A Product" />
        <div style={{ padding: "20px" }}>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Name" name="name">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Price" name="price">
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <InputNumber {...field} style={{ width: "100%" }} />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Quantity" name="quantity">
                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        style={{ width: "100%" }}
                        min={0}
                      />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Release Date" name="releaseDate">
                  <Controller
                    name="releaseDate"
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
              <Col span={8}>
                <Form.Item label="Brand" name="brand">
                  <Controller
                    name="brand"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Model" name="model">
                  <Controller
                    name="model"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Operating System" name="operatingSystem">
                  <Controller
                    name="operatingSystem"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select Operating System"
                        options={[
                          { value: "Android", label: <span>Android</span> },
                          { value: "iOS", label: <span>iOS</span> },
                        ]}
                      />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Screen Size" name="screenSize">
                  <Controller
                    name="screenSize"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Battery" name="battery">
                  <Controller
                    name="battery"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Front Camera" name="camera.front">
                  <Controller
                    name="camera.front"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Back Camera" name="camera.back">
                  <Controller
                    name="camera.back"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Processor Type" name="processor.type">
                  <Controller
                    name="processor.type"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Processor Speed" name="processor.speed">
                  <Controller
                    name="processor.speed"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="RAM" name="storage.RAM">
                  <Controller
                    name="storage.RAM"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select RAM"
                        options={StorageSizesArray.map((size) => ({
                          value: size,
                          label: <span>{size}</span>,
                        }))}
                      />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="ROM" name="storage.ROM">
                  <Controller
                    name="storage.ROM"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select ROM"
                        options={StorageSizesArray.map((size) => ({
                          value: size,
                          label: <span>{size}</span>,
                        }))}
                      />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Weight" name="weight">
                  <Controller
                    name="weight"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Charging Type" name="chargingType">
                  <Controller
                    name="chargingType"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Product Image"
                  name="productImage"
                  valuePropName="fileList"
                >
                  <Controller
                    name="productImage"
                    control={control}
                    render={({ field }) => (
                      <Upload {...field} beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Product Image</Button>
                      </Upload>
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Rating" name="rating">
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => <Rate allowHalf {...field} />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item label="Details" name="details">
                  <Controller
                    name="details"
                    control={control}
                    render={({ field }) => (
                      <Input.TextArea {...field} rows={5} />
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
                      Create Product
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </>
    </>
  );
};

export default DuplicateProductForm;
