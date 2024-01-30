import { Layout, Menu, Tooltip } from "antd";
const { Sider } = Layout;
import {
  AppstoreOutlined,
  PlusOutlined,
  DollarOutlined,
  DeleteOutlined,
  SyncOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const items = [
  {
    key: "1",
    icon: <AppstoreOutlined />,
    label: "Inventory",
    link: "/inventory",
  },
  {
    key: "2",
    icon: <PlusOutlined />,
    label: "Add New Product",
    link: "/create-product",
  },
  {
    key: "3",
    icon: <CopyOutlined />,
    label: "Duplicate Product",
    link: "/duplicate-product",
  },
  {
    key: "4",
    icon: <SyncOutlined />,
    label: "Update Products",
    link: "/create-product",
  },
  {
    key: "5",
    icon: <DeleteOutlined />,
    label: "Delete Products",
    link: "/delete-products",
  },
  {
    key: "6",
    icon: <DollarOutlined />,
    label: "Sales History",
    link: "/create-product",
  },
];

const Sidebar = () => {
  const { profileImage, userName } = useAppSelector((state) => state.user);
  const location = useLocation();
  const currentRoute = location.pathname;

  // Map your route paths to corresponding keys
  const pathToKey: Record<string, string> = {
    "/inventory": "1",
    "/create-product": "2",
    "/duplicate-product": "3",
    "/delete-products": "5",
    // Add more mappings as needed
  };

  // Determine the selected key based on the current route
  const selectedKey = pathToKey[currentRoute] || "1";

  const isDuplicateProductEnabled =
    currentRoute === "/duplicate-product" && location.state;

  return (
    <>
      <Sider
        width={"250px"}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            rowGap: "10px",
          }}
        >
          <div
            style={{
              width: "150px",
              height: "150px",
              border: "5px solid #1e90ff",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                borderRadius: "50%",
              }}
              src={profileImage}
              alt={userName}
            />
          </div>

          <h2 style={{ color: "#f5f6fa" }}>{userName}</h2>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              disabled={
                !isDuplicateProductEnabled && item.link === "/duplicate-product"
              }
            >
              {!isDuplicateProductEnabled &&
              item.link === "/duplicate-product" ? (
                <Tooltip
                  placement="right"
                  title={"Select product from product list!"}
                >
                  Duplicate Product
                </Tooltip>
              ) : (
                <NavLink to={item.link}>{item.label}</NavLink>
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </>
  );
};

export default Sidebar;
