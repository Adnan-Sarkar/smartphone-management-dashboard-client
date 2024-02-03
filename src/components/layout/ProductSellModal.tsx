import { Modal } from "antd";
import SellProductForm from "../form/SellProductForm";

const ProductSellModal = ({
  isOpen,
  handleCancel,
}: {
  productId: string;
  isOpen: boolean;
  handleCancel: () => void;
}) => {
  {
    return (
      <>
        <Modal open={isOpen} onCancel={handleCancel} onOk={handleCancel}>
          <SellProductForm />
        </Modal>
      </>
    );
  }
};

export default ProductSellModal;
