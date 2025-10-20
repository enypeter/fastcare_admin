import { createSlice } from '@reduxjs/toolkit';
import { fetchTransactions } from '../thunks';
import { TransactionsState } from '@/types';

const initialState: TransactionsState = {
  transactions: [],
  metaData: null,
  loading: false,
  error: null,
  filters: {},
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactionFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetTransactionFilters(state) {
      state.filters = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.metaData = action.payload.metaData;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTransactionFilters, resetTransactionFilters } = transactionSlice.actions;
export default transactionSlice.reducer;
