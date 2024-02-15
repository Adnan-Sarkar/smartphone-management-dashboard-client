import Inventory from "../components/layout/Inventory";
import { AppstoreOutlined } from "@ant-design/icons";

export const sellerPaths = [
  {
    name: "Inventory",
    path: "inventory",
    icon: <AppstoreOutlined />,
    element: <Inventory />,
  },
];
