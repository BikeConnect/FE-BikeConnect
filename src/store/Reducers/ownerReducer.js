import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_owner_request = createAsyncThunk(
  "owner/get_owner_request",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/get-owner-request`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.log("Error fetching owner request:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const owner_update_status = createAsyncThunk(
  "owner/owner_update_status",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/update-owner-status`, info, {
        withCredentials: true,
      });
      console.log("owner_update_status::::", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_active_owner = createAsyncThunk(
  "owner/get_active_owner",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-active-owner`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_deactive_owner = createAsyncThunk(
  "owner/get_deactive_owner",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-deactive-owner`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ownerReducer = createSlice({
  name: "owner",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    owners: [],
    totalOwner: 0,
    owner: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_owner_request.fulfilled, (state, { payload }) => {
        state.totalOwner = payload.totalOwner;
        state.owners = payload.owners;
      })

      .addCase(owner_update_status.fulfilled, (state, { payload }) => {
        state.owner = payload.owner;
        state.successMessage = payload.message;
      })

      .addCase(get_active_owner.fulfilled, (state, { payload }) => {
        state.owners = payload.owners;
        state.totalOwner = payload.totalOwner;
      })

      .addCase(get_deactive_owner.fulfilled, (state, { payload }) => {
        state.owners = payload.owners;
      });
  },
});

export const { messageClear } = ownerReducer.actions;
export default ownerReducer.reducer;
