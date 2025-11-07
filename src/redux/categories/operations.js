import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { api } from "../../api/axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/categories");
      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (categoryId, thunkAPI) => {
    try {
      const { data } = await api.get(`/categories/${categoryId}`);
      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/create",
  async (categoryData, thunkAPI) => {
    try {
      const { data } = await api.post("/categories", categoryData);
      toast.success("Category created successfully!");
      return data.data;
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ categoryId, categoryData }, thunkAPI) => {
    try {
      const { data } = await api.patch(
        `/categories/${categoryId}`,
        categoryData
      );
      toast.success("Category updated successfully!");
      return data.data;
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (categoryId, thunkAPI) => {
    try {
      await api.delete(`/categories/${categoryId}`);
      toast.success("Category deleted successfully!");
      return categoryId;
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);
