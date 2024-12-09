import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const owner_login = createAsyncThunk(
  "auth/owner_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log("owner info", info);
    try {
      const { data } = await api.post("/auth/owner-login", info, {
        withCredentials: true,
      });
      console.log(data);
      localStorage.setItem("accessToken", data.accessToken);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-login", info);
      localStorage.setItem("accessToken", data.accessToken);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-user", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const owner_upload_profile_image = createAsyncThunk(
  "auth/owner_upload_profile_image",
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/owner/upload-profile-image", image, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_upload_profile_image = createAsyncThunk(
  "auth/customer_upload_profile_image",
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/upload-profile-image", image, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const owner_update_profile_info = createAsyncThunk(
  "auth/owner_update_profile_info",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.put("/owner/update-profile", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_update_profile_info = createAsyncThunk(
  "auth/customer_update_profile_info",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.put("/customer/update-profile", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
    token: localStorage.getItem("accessToken"),
    userRole: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    customerLogout: (state, _) => {
      state.userInfo = "";
      state.token = "";
    },  
    ownerLogout: (state, _) => {
      state.userInfo = "";
      state.token = "";
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(owner_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(owner_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(owner_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.accessToken;
      })

      .addCase(customer_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(customer_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(customer_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.accessToken;
      })

      .addCase(get_user_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
      })

      .addCase(owner_upload_profile_image.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(owner_upload_profile_image.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.successMessage = payload.message;
      })

      .addCase(customer_upload_profile_image.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(
        customer_upload_profile_image.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.userInfo = payload.userInfo;
          state.successMessage = payload.message;
        }
      )

      .addCase(owner_update_profile_info.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(owner_update_profile_info.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(owner_update_profile_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.successMessage = payload.message;
      })

      .addCase(customer_update_profile_info.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(customer_update_profile_info.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(customer_update_profile_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.successMessage = payload.message;
      });
  },
});

export const { messageClear, setUserRole,customerLogout, ownerLogout } = authReducer.actions;
export default authReducer.reducer;
