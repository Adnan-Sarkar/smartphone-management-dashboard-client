export type TModal = {
  isModalOpen: boolean;
  productId: string;
  productQuantity: number | null;
  modalFor: "productDetails" | "productSell" | null;
};
