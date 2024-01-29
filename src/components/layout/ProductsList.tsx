import { Layout, Row } from "antd";
import ProductListFilter from "./ProductListFilter";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import LoadingProductCard from "./LoadingProductCard";
import { TProduct } from "../../types/product.types";
import { useAppDispatch } from "../../redux/hooks";
import { addProducts } from "../../redux/features/product/productSlice";

const { Content } = Layout;

const ProductsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState<TProduct>();
  const { data, isLoading } = useGetProductsQuery("");
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDetailsClick = (product: TProduct) => {
    setProduct(product);
    setIsModalOpen(true);
  };

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

  if (!isLoading && data?.data) {
    content = data?.data.map((product: TProduct) => (
      <ProductCard
        product={product}
        handleDetailsClick={() => handleDetailsClick(product)}
        key={product._id}
      />
    ));
  }

  return (
    <>
      {isModalOpen && (
        <ProductDetailsModal
          product={product as TProduct}
          isOpen={isModalOpen}
          handleCancel={handleCancel}
        />
      )}
      <Content style={{ padding: "10px", overflow: "hidden" }}>
        <ProductListFilter />
        <Row justify={"center"}>
          <Row gutter={[16, 30]}>{content}</Row>
        </Row>
      </Content>
    </>
  );
};

export default ProductsList;
