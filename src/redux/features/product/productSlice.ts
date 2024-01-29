import { createSlice } from "@reduxjs/toolkit";
import { TProductState } from "../../../types/product.types";

// initial state for user
const initialState: TProductState = {
  products: [],
  totalProducts: 0,
};

// create slice for user
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
      state.totalProducts = action?.payload.length;
    },
  },
});

export const { addProducts } = productSlice.actions;
export default productSlice.reducer;
