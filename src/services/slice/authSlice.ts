import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import apiClient from "../axiosInstance";
import { CreatePasswordT, LoginT } from "@/types";

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async (payload: LoginT, { rejectWithValue }) => {
      try {
        const res = await apiClient.post("/auth/login", payload);
        const { user, token } = res.data.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        return { user, token };
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Login failed");
      }
    }
  );
  
  export const createPasswordUser = createAsyncThunk(
    "auth/createPassword",
    async (payload: CreatePasswordT, { rejectWithValue }) => {
      try {
        const res = await apiClient.post("/auth/create-password", payload);
        const { user, token } = res.data.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        return { user, token };
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Password creation failed");
      }
    }
  )
  


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        toast.success("Login successful 🎉");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      // Create Password
      .addCase(createPasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(createPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
