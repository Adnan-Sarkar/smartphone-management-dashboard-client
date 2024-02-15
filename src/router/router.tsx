import { createBrowserRouter } from "react-router-dom";
import Login from "./../pages/Login";
import Registration from "./../pages/Registration";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import { superAdminPaths } from "./superAdmin.route";
import { managerPaths } from "./manager.route";
import { sellerPaths } from "./seller.route";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/super-admin",
    element: <App />,
    children: routesGenerator(superAdminPaths),
  },
  {
    path: "/branch-manager",
    element: <App />,
    children: routesGenerator(managerPaths),
  },
  {
    path: "/seller",
    element: <App />,
    children: routesGenerator(sellerPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
