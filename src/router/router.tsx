import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import MainLayout from "../components/layout/MainLayout";
import Inventory from "../components/layout/Inventory";
import ProtechtedRoute from "../components/layout/ProtechtedRoute";
import ProductForm from "../components/form/ProductForm";
import DuplicateProductForm from "../components/form/DuplicateProductForm";
import DeleteProducts from "../components/layout/DeleteProducts";
import UpdateProducts from "../components/layout/UpdateProducts";

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
    path: "/duplicate-product",
    element: (
      <ProtechtedRoute>
        <MainLayout>
          <DuplicateProductForm />
        </MainLayout>
      </ProtechtedRoute>
    ),
  },
  {
    path: "/update-products",
    element: (
      <ProtechtedRoute>
        <MainLayout>
          <UpdateProducts />
        </MainLayout>
      </ProtechtedRoute>
    ),
  },
  {
    path: "/delete-products",
    element: (
      <ProtechtedRoute>
        <MainLayout>
          <DeleteProducts />
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
