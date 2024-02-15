import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Controller, FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useUpdateUserMutation } from "../../redux/features/user/userApi";
import sendImageToCloudinary from "../../utils/sendImageToCloudinary";
import { IUser } from "../../types/user.type";

const { Option } = Select;

const UpdateUserForm = ({
  payload,
  handleCancel,
}: {
  payload: IUser;
  handleCancel: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const defaultValues = {
    fullName: payload.fullName,
    userName: payload.userName,
    email: payload.email,
    phone: payload.phone,
    gender: payload.gender,
    age: payload.age?.toString(),
    profileImage: payload.profileImage,
    role: payload.role,
  };

  const { handleSubmit, control } = useForm({
    defaultValues,
  });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    const toastId = toast.loading("Loading...");

    const {
      fullName,
      userName,
      email,
      phone,
      gender,
      age,
      profileImage,
      role,
    } = data;

    if (
      fullName &&
      userName &&
      email &&
      phone &&
      gender &&
      age &&
      profileImage &&
      role
    ) {
      // check if new image is selected then add new image otherwise old image
      let imageUrl = profileImage;
      if (profileImage?.file?.uid) {
        imageUrl = await sendImageToCloudinary(profileImage.file);
      }

      try {
        const response = await updateUser({
          id: payload._id,
          user: {
            fullName,
            userName,
            email,
            phone,
            gender,
            age: Number(age),
            profileImage: imageUrl,
            role,
          },
        }).unwrap();

        // check registration is successfull or not
        if (response?.statusCode !== 200) {
          throw new Error(response.data.message);
        }

        setIsLoading(false);

        toast.success(`Congratulations, user updated successfully`, {
          id: toastId,
          duration: 1500,
        });

        handleCancel();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setIsLoading(false);
        toast.error(err?.data.message, {
          id: toastId,
          duration: 1500,
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
    <Form
      style={{
        background: "#f5f6fa",
        padding: "50px",
        borderRadius: "10px",
      }}
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Update User Info
      </h1>
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
          <Form.Item label="Phone" name="phone">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input type="text" {...field} />}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
        <Col span={12}>
          <Form.Item label="Age" name="age">
            <Controller
              name="age"
              control={control}
              render={({ field }) => <Input type="text" {...field} />}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Gender" name="gender">
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
      </Row>

      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
        <Col span={12}>
          <Form.Item label="Role" name="role">
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select {...field} placeholder="Role">
                  <Option value="branch-manager">Branch Manager</Option>
                  <Option value="seller">Seller</Option>
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
                  style={{ width: "100%" }}
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
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateUserForm;
