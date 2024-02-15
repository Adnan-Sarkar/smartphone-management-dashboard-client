import DuplicateProductForm from "../components/form/DuplicateProductForm";
import ProductForm from "../components/form/ProductForm";
import Inventory from "../components/layout/Inventory";
import UpdateProducts from "../components/layout/UpdateProducts";
import {
  AppstoreOutlined,
  PlusOutlined,
  SyncOutlined,
  CopyOutlined,
} from "@ant-design/icons";

export const managerPaths = [
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
];
