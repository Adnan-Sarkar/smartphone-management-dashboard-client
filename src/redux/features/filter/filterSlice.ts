import { createSlice } from "@reduxjs/toolkit";

// initial state for filter
const initialState = {
  productFilterQuery: "",
};

// create slice for filter
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addProductFilterQuery: (state, action) => {
      state.productFilterQuery = action.payload;
    },

    removeProductFilterQuery: (state) => {
      state.productFilterQuery = "";
    },
  },
});

export const { addProductFilterQuery, removeProductFilterQuery } =
  filterSlice.actions;
export default filterSlice.reducer;
