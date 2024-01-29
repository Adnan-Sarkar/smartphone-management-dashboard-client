import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import MainLayout from "../components/layout/MainLayout";
import Inventory from "../components/layout/Inventory";
import ProtechtedRoute from "../components/layout/ProtechtedRoute";
import ProductForm from "../components/form/ProductForm";

const router = createBrowserRouter([
  {
    path: "/inventory",
    element: (
      <ProtechtedRoute>
        <MainLayout>
          <Inventory />
        </MainLayout>
      </ProtechtedRoute>
    ),
  },
  {
    path: "/create-product",
    element: (
      <ProtechtedRoute>
        <MainLayout>
          <ProductForm />
        </MainLayout>
      </ProtechtedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);

export default router;
