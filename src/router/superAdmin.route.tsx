import DuplicateProductForm from "../components/form/DuplicateProductForm";
import ProductForm from "../components/form/ProductForm";
import CreateUser from "../components/layout/CreateUser";
import DeleteProducts from "../components/layout/DeleteProducts";
import Inventory from "../components/layout/Inventory";
import SalesHistory from "../components/layout/SalesHistory";
import UpdateProducts from "../components/layout/UpdateProducts";
import {
  AppstoreOutlined,
  PlusOutlined,
  DollarOutlined,
  DeleteOutlined,
  SyncOutlined,
  CopyOutlined,
  UserAddOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import UserList from "../components/layout/UserList";

export const superAdminPaths = [
  {
    name: "Inventory",
    path: "inventory",
    icon: <AppstoreOutlined />,
    element: <Inventory />,
  },
  {
    name: "Create Product",
    path: "create-product",
    icon: <PlusOutlined />,
    element: <ProductForm />,
  },
  {
    name: "Duplicate Product",
    path: "duplicate-product",
    icon: <CopyOutlined />,
    element: <DuplicateProductForm />,
  },
  {
    name: "Update Products",
    path: "update-products",
    icon: <SyncOutlined />,
    element: <UpdateProducts />,
  },
  {
    name: "Delete Products",
    path: "delete-products",
    icon: <DeleteOutlined />,
    element: <DeleteProducts />,
  },
  {
    name: "Sales History",
    path: "sales-history",
    icon: <DollarOutlined />,
    element: <SalesHistory />,
  },
  {
    name: "User Management",
    icon: <UserOutlined />,
    children: [
      {
        name: "Create User",
        path: "create-user",
        icon: <UserAddOutlined />,
        element: <CreateUser />,
      },
      {
        name: "User List",
        path: "user-list",
        icon: <TeamOutlined />,
        element: <UserList />,
      },
    ],
  },
];
