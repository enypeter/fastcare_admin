import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AmbulanceProviderState, AmbulanceProvider } from "@/types";

import toast from "react-hot-toast";
import { fetchAmbulanceProviders } from "../thunks";

const initialState: AmbulanceProviderState = {
  providers: [],
  selectedProvider: null,
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
};

const ambulanceProviderSlice = createSlice({
  name: "ambulanceProviders",
  initialState,
  reducers: {
    setSelectedProvider: (state, action: PayloadAction<AmbulanceProvider | null>) => {
      state.selectedProvider = action.payload;
    },
    clearProviders: (state) => {
      state.providers = [];
      state.selectedProvider = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all ambulance providers
      .addCase(fetchAmbulanceProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmbulanceProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload;
      })
      .addCase(fetchAmbulanceProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Failed to fetch ambulance providers");
      });
  },
});

export const { setSelectedProvider, clearProviders } = ambulanceProviderSlice.actions;
export default ambulanceProviderSlice.reducer;