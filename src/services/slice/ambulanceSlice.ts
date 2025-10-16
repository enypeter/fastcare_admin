// services/slices/ambulanceSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { activateAmbulanceProvider, createAmbulanceProviders, deactivateAmbulanceProvider, fetchAmbulanceProviders } from "../thunks";
import { AmbulanceProvider } from "@/types";

const ambulanceSlice = createSlice({
  name: "providers",
  initialState: {
    providers: [] as AmbulanceProvider[],
    loading: false,
    error: null as string | null,
    createLoading: false,
    createError: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAmbulanceProviders.pending, state => {
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
      })
      .addCase(createAmbulanceProviders.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createAmbulanceProviders.fulfilled, (state) => {
        state.createLoading = false;
       })
      .addCase(createAmbulanceProviders.rejected, (state, action) => {
          state.createLoading = false;
          state.createError = action.payload as string;
      })
      .addCase(activateAmbulanceProvider.fulfilled, (state, action) => {
        const updated = action.payload;
        state.providers = state.providers.map(provider =>
          provider.id === updated.id ? updated : provider
        );
      })
      .addCase(deactivateAmbulanceProvider.fulfilled, (state, action) => {
        const updated = action.payload;
        state.providers = state.providers.map(provider =>
          provider.id === updated.id ? updated : provider
        );
      });
  },
});

export default ambulanceSlice.reducer;
