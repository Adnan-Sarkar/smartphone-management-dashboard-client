import { createSlice } from "@reduxjs/toolkit";
import { TModal } from "../../../types/modal.types";

// initial state for modal
const initialState: TModal = {
  isModalOpen: false,
  productId: "",
  productQuantity: null,
  modalFor: null,
};

// create slice for modal
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      state.isModalOpen = true;
      state.productId = action.payload.productId;
      state.productQuantity = action.payload.productQuantity;
      state.modalFor = action.payload.modalFor;
    },

    modalClose: (state) => {
      state.isModalOpen = false;
      state.productId = "";
      state.productQuantity = null;
      state.modalFor = null;
    },
  },
});

export const { modalClose, modalOpen } = modalSlice.actions;
export default modalSlice.reducer;
