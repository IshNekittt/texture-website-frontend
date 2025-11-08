import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./operations";

const initialState = {
  items: [],
  currentItem: null,
  isLoading: false,
  error: null,
};

const thunks = [
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
];
const getThunks = (type) => thunks.map((thunk) => thunk[type]);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
        if (state.currentItem?._id === action.payload._id)
          state.currentItem = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addMatcher(isAnyOf(...getThunks("pending")), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(...getThunks("fulfilled")), (state) => {
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(...getThunks("rejected")), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
