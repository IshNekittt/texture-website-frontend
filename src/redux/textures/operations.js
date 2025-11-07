// src/redux/textures/operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { api } from "../../api/axios";

export const fetchTextures = createAsyncThunk(
  "textures/fetchAll",
  async (params, thunkAPI) => {
    try {
      const { data } = await api.get("/textures", { params });
      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchTextureById = createAsyncThunk(
  "textures/fetchById",
  async (textureId, thunkAPI) => {
    try {
      const { data } = await api.get(`/textures/${textureId}`);
      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const createTexture = createAsyncThunk(
  "textures/create",
  async (textureData, thunkAPI) => {
    try {
      const { data } = await api.post("/textures", textureData);
      toast.success("Texture created successfully!");
      return data.data;
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const updateTexture = createAsyncThunk(
  "textures/update",
  async ({ textureId, textureData }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/textures/${textureId}`, textureData);
      toast.success("Texture updated successfully!");
      return data.data;
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const deleteTexture = createAsyncThunk(
  "textures/delete",
  async (textureId, thunkAPI) => {
    try {
      await api.delete(`/textures/${textureId}`);
      toast.success("Texture deleted successfully!");
      return textureId;
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);
