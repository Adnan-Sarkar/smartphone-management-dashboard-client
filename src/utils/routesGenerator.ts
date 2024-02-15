import { TRoute, TRoutesPath } from "../types/routes.type";

// generate routes from custom array of object
export const routesGenerator = (items: TRoutesPath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item?.path && item?.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    } else if (item?.children) {
      item.children.forEach((childItem) => {
        acc.push({
          path: childItem.path as string,
          element: childItem.element,
        });
      });
    }

    return acc;
  }, []);

  return routes;
};
