// accountSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { createAdmin, createRole, fetchProfile, fetchRoles, updateProfile } from "@/services/thunks";
import { AccountState } from "@/types";



const initialState: AccountState = {
  profile: null,
  loading: false,
  error: null,
  roles: null,
  rolesLoading: false,
  rolesError: null,
   createLoading: false,
  createError: null,
  updateLoading: false,
  updateSuccess: false,
   createroleLoading: false,
  createroleError: null,

};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRoles.pending, (state) => {
        state.rolesLoading = true;
        state.rolesError = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.rolesLoading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.rolesLoading = false;
        state.rolesError = action.payload as string;
      })

      .addCase(createAdmin.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createAdmin.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
      })

      .addCase(updateProfile.pending, state => {
        state.updateLoading = true;
        state.updateSuccess = false;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        state.profile = action.payload; // refresh profile with updated data
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = false;
        state.error = action.payload as string;
      })
      .addCase(createRole.pending, (state) => {
        state.createroleLoading = true;
        state.createroleError = null;
      })
      .addCase(createRole.fulfilled, (state) => {
        state.createroleLoading = false;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.createroleLoading = false;
        state.createroleError = action.payload as string;
      })
  },
});

export default accountSlice.reducer;
