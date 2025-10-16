import { DispatchHistory, DispatchHistoryState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDispatchHistory } from '../thunks';

const initialState: DispatchHistoryState = {
    dispatchHistory: [],
    loading: false,
    error: null,
};

const dispatchHistorySlice = createSlice({
    name: 'dispatchHistory',
    initialState,
    reducers: {
        clearError: state => {
            state.error = null;
        },
        clearHistory: state => {
            state.dispatchHistory = [];
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchDispatchHistory.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchDispatchHistory.fulfilled,
                (state, action: PayloadAction<DispatchHistory[]>) => {
                    state.loading = false;
                    state.dispatchHistory = action.payload;
                    state.error = null;
                },
            )
            .addCase(fetchDispatchHistory.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as string) || 'Failed to fetch dispatch history';
            });
    },
});

export const { clearError, clearHistory } = dispatchHistorySlice.actions;
export default dispatchHistorySlice.reducer;