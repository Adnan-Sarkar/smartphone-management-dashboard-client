import { createSlice } from "@reduxjs/toolkit";
import { TModal } from "../../../types/modal.types";

// initial state for user
const initialState: TModal = {
  isModalOpen: false,
  productId: "",
  modalFor: null,
};

// create slice for user
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalOpen: (state, action) => {
      state.isModalOpen = true;
      state.productId = action.payload.productId;
      state.modalFor = action.payload.modalFor;
    },

    modalClose: (state) => {
      state.isModalOpen = false;
      state.productId = "";
      state.modalFor = null;
    },
  },
});

export const { modalClose, modalOpen } = modalSlice.actions;
export default modalSlice.reducer;
