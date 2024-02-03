import { Empty, Layout } from "antd";
import ProductListFilter from "./ProductListFilter";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import LoadingProductCard from "./LoadingProductCard";
import { TProduct } from "../../types/product.types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addProducts } from "../../redux/features/product/productSlice";
import CommonModal from "./CommonModal";
import ProductDetails from "./ProductDetails";
import SellProductForm from "../form/SellProductForm";

const { Content } = Layout;

const ProductsList = () => {
  const { modalFor } = useAppSelector((state) => state.modal);
  const { productFilterQuery } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetProductsQuery(productFilterQuery);

  useEffect(() => {
    if (!isLoading && data?.data) {
      dispatch(addProducts(data?.data));
    }
  }, [dispatch, isLoading, data]);

  let content = null;

  if (isLoading) {
    content = [
      <LoadingProductCard key={1} />,
      <LoadingProductCard key={2} />,
      <LoadingProductCard key={3} />,
      <LoadingProductCard key={4} />,
      <LoadingProductCard key={5} />,
      <LoadingProductCard key={6} />,
    ];
  }

  if (!isLoading && data?.data?.length > 0) {
    content = data?.data.map((product: TProduct) => (
      <ProductCard product={product} key={product._id} />
    ));
  }

  return (
    <>
      {modalFor && modalFor === "productDetails" && (
        <CommonModal>
          <ProductDetails />
        </CommonModal>
      )}
      {modalFor && modalFor === "productSell" && (
        <CommonModal>
          <SellProductForm />
        </CommonModal>
      )}
      <Content style={{ padding: "10px" }}>
        <ProductListFilter />
        {!isLoading && data?.data?.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No Products Found!</span>}
          />
        ) : (
          ""
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
            gap: "30px",
          }}
        >
          {content}
        </div>
      </Content>
    </>
  );
};

export default ProductsList;
