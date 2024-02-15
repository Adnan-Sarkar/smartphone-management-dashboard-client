/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Space, Table, TableColumnsType, Tag } from "antd";
import DynamicHeader from "./DynamicHeader";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { IUser } from "../../types/user.type";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../redux/features/user/userApi";
import toast from "react-hot-toast";
import UpdateUserForm from "../form/UpdateUserForm";

const UserList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUserInfo, setUpdateProductInfo] = useState<IUser | null>(null);
  const { data, isLoading } = useGetAllUsersQuery("");
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const columns: TableColumnsType<IUser> = [
    {
      title: "Image",
      dataIndex: "profileImage",
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
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "User Role",
      dataIndex: "role",
      render: (text) => (
        <Tag
          style={{ color: "#222f3e", fontWeight: "bold" }}
          color={`${text === "seller" ? "#48dbfb" : "#2ed573"}`}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Action",
      dataIndex: "update",
      render: (_, record) => (
        <Space size={"small"} direction="horizontal">
          <Button
            onClick={() => handleUpdate(record)}
            type="text"
            style={{ background: "#f9ca24" }}
          >
            <Space direction="horizontal">
              <EditOutlined /> Update User
            </Space>
          </Button>
          <Button
            onClick={() => handleDelete(record._id)}
            type="text"
            style={{ background: "#ff7979" }}
          >
            <Space direction="horizontal">
              <DeleteOutlined /> Delete User
            </Space>
          </Button>
        </Space>
      ),
    },
  ];

  let products = [];
  if (!isLoading && data) {
    products = data.data.map((user: IUser) => {
      return {
        key: user._id,
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        age: user.age,
        profileImage: user.profileImage,
        role: user.role,
      };
    });
  }

  const handleUpdate = (data: IUser) => {
    setUpdateProductInfo(data);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting User...");

    console.log({ id });

    try {
      const response = await deleteUser(id).unwrap();

      if (response.success) {
        toast.success("User deleted successfully", {
          id: toastId,
          duration: 1500,
        });
      }
    } catch (err: any) {
      toast.error(err.data.errorDetails, {
        id: toastId,
        duration: 1500,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // set loading
  let loading = false;

  if (isDeleting && isLoading) {
    loading = true;
  }
  if (isDeleting && !isLoading) {
    loading = true;
  }
  if (!isDeleting && isLoading) {
    loading = true;
  }

  return (
    <>
      {isModalOpen && (
        <Modal open={isModalOpen} onCancel={handleCancel} onOk={handleCancel}>
          <UpdateUserForm
            payload={updateUserInfo as IUser}
            handleCancel={handleCancel}
          />
        </Modal>
      )}
      <DynamicHeader title="User List" />
      <div style={{ padding: "10px" }}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={products}
          pagination={{
            position: ["bottomCenter"],
            pageSize: 6,
          }}
        />
      </div>
    </>
  );
};

export default UserList;
