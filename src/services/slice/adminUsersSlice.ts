import { createSlice } from '@reduxjs/toolkit';
import type { AdminUsersState, AdminUser } from '@/types';
import { fetchAdminUsers, updateAdminUser, toggleAdminUserActive } from '@/services/thunks';

const initialState: AdminUsersState = {
  users: [],
  metaData: null,
  loading: false,
  error: null,
  updating: false,
  updateError: null,
  toggling: false,
  toggleError: null,
  filters: {},
};

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {
    setAdminUserFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearAdminUserFilters(state) {
      state.filters = {};
    },
  },
  extraReducers: builder => {
    builder
      // fetch list
      .addCase(fetchAdminUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users as AdminUser[];
        state.metaData = action.payload.metaData;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load users';
      })
      // update user
      .addCase(updateAdminUser.pending, state => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateAdminUser.fulfilled, (state, action) => {
        state.updating = false;
        // attempt to merge updated user into list if id present
        const updated = action.payload?.data as Partial<AdminUser> & { id?: string };
        if (updated?.id) {
          const idx = state.users.findIndex(u => u.id === updated.id);
            if (idx !== -1) {
              state.users[idx] = { ...state.users[idx], ...updated } as AdminUser;
            }
        }
      })
      .addCase(updateAdminUser.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload as string || 'Failed to update user';
      })
      // toggle active
      .addCase(toggleAdminUserActive.pending, state => {
        state.toggling = true;
        state.toggleError = null;
      })
      .addCase(toggleAdminUserActive.fulfilled, (state, action) => {
        state.toggling = false;
        const { userId } = action.payload;
        const user = state.users.find(u => u.id === userId);
        if (user) {
          user.isActive = !user.isActive; // flip locally; server returns new state implicitly
        }
      })
      .addCase(toggleAdminUserActive.rejected, (state, action) => {
        state.toggling = false;
        state.toggleError = action.payload as string || 'Failed to toggle user state';
      });
  }
});

export const { setAdminUserFilters, clearAdminUserFilters } = adminUsersSlice.actions;
export default adminUsersSlice.reducer;
