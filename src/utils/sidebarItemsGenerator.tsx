import { Tooltip } from "antd";
import { TRoutesPath } from "../types/routes.type";
import { TSidebarItem } from "../types/sidebar.types";
import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (
  items: TRoutesPath[],
  role: string,
  endpoint: string
) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.element) {
      if (item.path === "duplicate-product") {
        acc.push({
          key: item.path,
          label: (
            <Tooltip
              placement="right"
              title={"Select product from product list!"}
            >
              {item.name}
            </Tooltip>
          ),
          icon: item.icon,
          disabled: endpoint === "duplicate-product" ? false : true,
        });
      } else {
        acc.push({
          key: item.path,
          label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
          icon: item.icon,
        });
      }
    }
    // check if nested route is availabe then create nested sidebar menu
    else if (item.children) {
      acc.push({
        key: item.path as string,
        label: item.name,
        icon: item.icon,
        children: item.children.map((childItem) => {
          return {
            key: childItem.path as string,
            label: (
              <NavLink to={`/${role}/${childItem.path}`}>
                {childItem.name}
              </NavLink>
            ),
            icon: childItem.icon,
          };
        }),
      });
    }
    return acc;
  }, []);

  return sidebarItems;
};
