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
import { useNavigate } from "react-router-dom";
import { StorageSizesArray } from "../../constant/storageSize.constant";
import { useAppSelector } from "../../redux/hooks";

const defaultValues = {
  battery: "5000 mAh",
  brand: "Samsung",
  camera: { front: "13 MP", back: "48 MP" },
  chargingType: "Type C",
  details:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit",
  model: "A-34",
  name: "Samsung Galaxy A34",
  operatingSystem: "Android",
  price: 500,
  processor: { type: "Mediatek Dimensity 1080 (6 nm)", speed: "2x2.6 GHz" },
  productImage: undefined,
  quantity: 20,
  rating: 4,
  releaseDate: undefined,
  screenSize: "6.6 inches",
  storage: { RAM: "8GB", ROM: "128GB" },
  weight: "199 g",
};

const ProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const { role } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues,
  });

  const onSubmit = async (data: FieldValues) => {
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

  return (
    <>
      <DynamicHeader title="Create New Product" />
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
                    <InputNumber {...field} style={{ width: "100%" }} min={0} />
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
                    <DatePicker {...field} style={{ width: "100%" }} />
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
                  render={({ field }) => <Input.TextArea {...field} rows={5} />}
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
  );
};

export default ProductForm;
