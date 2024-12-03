import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_chat_owner = createAsyncThunk(
  "chat/add_chat_owner",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/add-customer-owner",
        info
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_chat_customer = createAsyncThunk(
  "chat/add_chat_customer",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/add-owner-customer",
        info
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_send_messages = createAsyncThunk(
  "chat/customer_send_messages",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/send-message-to-owner",
        info
      );
      // console.log("data::",data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_customers = createAsyncThunk(
  "chat/get_customers",
  async (ownerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/owner/get-customers/${ownerId}`, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_customer_message = createAsyncThunk(
  "chat/get_customer_message",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/chat/owner/get-customer-message/${customerId}`,
        {
          withCredentials: true,
        }
      );
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const owner_send_messages = createAsyncThunk(
  "chat/owner_send_messages",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/owner/send-message-to-customer",
        info,
        {
          withCredentials: true,
        }
      );
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [],
    fr_messages: [], // owner messages
    currentFr: "", // current owner
    customers: [],
    customer_messages: [], // customer messages
    currentCustomer: {},
    activeCustomer: [],
    activeOwner: [],
    activeAdmin: [],
    owner_admin_messages: [], // owner admin messages
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateCustomerMessage: (state, { payload }) => {
      state.fr_messages = [...state.fr_messages, payload];
    },
    updateOwnerMessage: (state, { payload }) => {
      state.customer_messages = [...state.customer_messages, payload];
    }, 
    updateOwners: (state, { payload }) => {
      state.activeOwner = payload;
    },
    updateCustomer: (state, { payload }) => {
      state.activeCustomer = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_chat_owner.fulfilled, (state, { payload }) => {
        state.fr_messages = payload.messages;
        state.currentFr = payload.currentFriend;
        state.my_friends = payload.MyFriends;
      })

      .addCase(add_chat_customer.fulfilled, (state, { payload }) => {
        state.customer_messages = payload.messages;
        state.currentCustomer = payload.currentFriend;
        state.customers = payload.MyFriends;
      })

      .addCase(customer_send_messages.fulfilled, (state, { payload }) => {
        let tempFriends = state.my_friends;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.message.receiverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.my_friends = tempFriends;
        state.fr_messages = [...state.fr_messages, payload.message];
        state.successMessage = "Message sent successfully";
      })

      .addCase(get_customers.fulfilled, (state, { payload }) => {
        state.customers = payload.customers;
      })

      .addCase(get_customer_message.fulfilled, (state, { payload }) => {
        state.customer_messages = payload.messages;
        state.currentCustomer = payload.currentCustomer;
      })

      
      .addCase(owner_send_messages.fulfilled, (state, { payload }) => {
        let tempFriends = state.customers;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.message.receiverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.customers = tempFriends;
        state.customer_messages = [...state.customer_messages, payload.message];
        state.successMessage = "Message sent successfully";
      })


  },
});

export const { messageClear, updateCustomerMessage, updateOwnerMessage, updateOwners, updateCustomer } = chatReducer.actions;
export default chatReducer.reducer;