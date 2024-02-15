import { Layout, Menu, MenuProps } from "antd";
const { Sider } = Layout;

import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { superAdminPaths } from "../../router/superAdmin.route";
import SidebarUserAvater from "./SidebarUserAvater";
import { managerPaths } from "../../router/manager.route";
import { sellerPaths } from "../../router/seller.route";

const userRole = {
  SUPERADMIN: "super-admin",
  MANAGER: "branch-manager",
  SELLER: "seller",
};

const Sidebar = () => {
  const { profileImage, userName, role } = useAppSelector(
    (state) => state.user
  );
  const location = useLocation();
  const currentRoute = location.pathname;

  // Map your route paths to corresponding keys
  const pathToKey: Record<string, string> = {
    [`/${role}/inventory`]: "inventory",
    [`/${role}/create-product`]: "create-product",
    [`/${role}/duplicate-product`]: "duplicate-product",
    [`/${role}/update-products`]: "update-products",
    [`/${role}/delete-products`]: "delete-products",
    [`/${role}/sales-history`]: "sales-history",
    [`/${role}/create-user`]: "create-user",
    [`/${role}/user-list`]: "user-list",
  };

  // Determine the selected key based on the current route
  const selectedKey = pathToKey[currentRoute] || "1";

  let sidebarItems: MenuProps["items"] = [];

  switch (role) {
    case userRole.SUPERADMIN:
      sidebarItems = sidebarItemsGenerator(superAdminPaths, role, selectedKey);
      break;
    case userRole.MANAGER:
      sidebarItems = sidebarItemsGenerator(managerPaths, role, selectedKey);
      break;
    case userRole.SELLER:
      sidebarItems = sidebarItemsGenerator(sellerPaths, role, selectedKey);
      break;
  }

  return (
    <>
      <Sider width={"250px"} breakpoint="lg" collapsedWidth="0">
        <SidebarUserAvater profileImage={profileImage} userName={userName} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={sidebarItems}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
