import { Modal } from "antd";
import SellProductForm from "../form/SellProductForm";

const ProductSellModal = ({
  productId,
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
          <SellProductForm productId={productId} handleCancel={handleCancel} />
        </Modal>
      </>
    );
  }
};

export default ProductSellModal;
