import { Modal } from "antd";
import UpdateProductForm from "../form/UpdateProductForm";
import { TProduct } from "../../types/product.types";

const ProductUpdateModal = ({
  product,
  isOpen,
  handleCancel,
}: {
  product: TProduct | null;
  isOpen: boolean;
  handleCancel: () => void;
}) => {
  return (
    <>
      <Modal open={isOpen} onCancel={handleCancel} onOk={handleCancel}>
        <UpdateProductForm product={product} modalCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default ProductUpdateModal;
