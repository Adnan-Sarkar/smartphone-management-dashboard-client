import { Layout } from "antd";
import ProductListFilter from "./ProductListFilter";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import LoadingProductCard from "./LoadingProductCard";
import { TProduct } from "../../types/product.types";
import { useAppDispatch } from "../../redux/hooks";
import { addProducts } from "../../redux/features/product/productSlice";
import ProductSellModal from "./ProductSellModal";

const { Content } = Layout;

const ProductsList = () => {
  const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] =
    useState(false);
  const [isProductSellModalOpen, setIsProductSellModalOpen] = useState(false);
  const [producId, setProductId] = useState("");
  const [product, setProduct] = useState<TProduct>();
  const { data, isLoading } = useGetProductsQuery("");
  const dispatch = useAppDispatch();

  const handleProductDetailsModalCancel = () => {
    setIsProductDetailsModalOpen(false);
  };

  const handleProductSellModalCancel = () => {
    setIsProductSellModalOpen(false);
  };

  const handleDetailsClick = (product: TProduct) => {
    setProduct(product);
    setIsProductDetailsModalOpen(true);
  };

  const handleSellClick = (id: string) => {
    setProductId(id);
    setIsProductSellModalOpen(true);
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
        handleSellClick={() => handleSellClick(product._id)}
        key={product._id}
      />
    ));
  }

  return (
    <>
      {isProductDetailsModalOpen && (
        <ProductDetailsModal
          product={product as TProduct}
          isOpen={isProductDetailsModalOpen}
          handleCancel={handleProductDetailsModalCancel}
        />
      )}
      {isProductSellModalOpen && (
        <ProductSellModal
          isOpen={isProductSellModalOpen}
          handleCancel={handleProductSellModalCancel}
          productId={producId}
        />
      )}
      <Content style={{ padding: "10px" }}>
        <ProductListFilter />
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
