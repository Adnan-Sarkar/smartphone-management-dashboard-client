import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { modalClose } from "../../redux/features/modal/modalSlice";
import { ReactNode } from "react";

const CommonModal = ({ children }: { children: ReactNode }) => {
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpen);
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    dispatch(modalClose());
  };

  return (
    <>
      <Modal open={isModalOpen} onCancel={handleCancel} onOk={handleCancel}>
        {children}
      </Modal>
    </>
  );
};

export default CommonModal;
