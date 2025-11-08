import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchTextures,
  fetchTextureById,
  createTexture,
  updateTexture,
  deleteTexture,
} from "./operations";

const initialState = {
  items: [],
  currentItem: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    perPage: 20,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: true,
    hasPreviousPage: false,
  },
};

const texturesSlice = createSlice({
  name: "textures",
  initialState,
  reducers: {
    clearTextures: (state) => {
      state.items = [];
      state.pagination.page = 1;
      state.pagination.hasNextPage = true;
    },
    clearCurrentTexture: (state) => {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTextures.fulfilled, (state, action) => {
        const { data, ...paginationData } = action.payload;
        if (paginationData.page === 1) {
          state.items = data;
        } else {
          state.items.push(...data);
        }
        state.pagination = paginationData;
        state.isLoading = false;
      })

      .addCase(fetchTextureById.fulfilled, (state, action) => {
        state.currentItem = action.payload;
        state.isLoading = false;
      })

      .addCase(createTexture.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.isLoading = false;
      })
      .addCase(updateTexture.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteTexture.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.isLoading = false;
      })

      .addMatcher(
        isAnyOf(
          fetchTextures.pending,
          fetchTextureById.pending,
          createTexture.pending,
          updateTexture.pending,
          deleteTexture.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchTextures.rejected,
          fetchTextureById.rejected,
          createTexture.rejected,
          updateTexture.rejected,
          deleteTexture.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearTextures, clearCurrentTexture } = texturesSlice.actions;
export const texturesReducer = texturesSlice.reducer;
