import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Controller, FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import sendImageToCloudinary from "../utils/sendImageToCloudinary";
import { useRegisterMutation } from "../redux/features/user/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const { Option } = Select;

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control } = useForm();
  const [registration] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    const toastId = toast.loading("Registration processing...");

    const {
      fullName,
      userName,
      email,
      password,
      phone,
      gender,
      age,
      profileImage,
    } = data;

    if (
      fullName &&
      userName &&
      email &&
      password &&
      phone &&
      gender &&
      age &&
      profileImage
    ) {
      // send profile image to cloudinary and get the hosted url
      const imageUrl = await sendImageToCloudinary(profileImage.file);

      try {
        const response = await registration({
          fullName,
          userName,
          email,
          password,
          phone,
          gender,
          age: Number(age),
          profileImage: imageUrl,
        }).unwrap();

        // check registration is successfull or not
        if (response?.statusCode !== 201) {
          throw new Error(response.data.message);
        }

        setIsLoading(false);

        toast.success("Congratulation, your registration is successfull", {
          id: toastId,
          duration: 1000,
        });
        // navigate login page
        navigate("/login");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setIsLoading(false);
        toast.error("Registration failed! Try again", {
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
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        style={{
          background: "#f5f6fa",
          padding: "50px",
          borderRadius: "10px",
        }}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <h1 style={{ textAlign: "center" }}>Create New Account</h1>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
          <Col span={12}>
            <Form.Item label="Full Name" name="fullName">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => <Input type="text" {...field} />}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="User Name" name="userName">
              <Controller
                name="userName"
                control={control}
                render={({ field }) => <Input type="text" {...field} />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input type="email" {...field} />}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Password" name="password">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password type="password" {...field} />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
          <Col span={12}>
            <Form.Item label="Phone" name="phone">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <Input type="text" {...field} />}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Age" name="age">
              <Controller
                name="age"
                control={control}
                render={({ field }) => <Input type="text" {...field} />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
          <Col span={12}>
            <Form.Item label="Password" name="gender">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select {...field} placeholder="Gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Profile Picture" name="profileImage">
              <Controller
                name="profileImage"
                control={control}
                render={({ field }) => (
                  <Upload
                    {...field}
                    beforeUpload={() => false}
                    style={{ display: "block" }}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            disabled={isLoading}
          >
            Registration
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          Already have an account? <Link to={"/login"}>Login</Link>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
