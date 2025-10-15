import { createSlice } from '@reduxjs/toolkit';
import { fetchTransactions, exportTransactions } from '../thunks';
import { TransactionsState } from '@/types';

const initialState: TransactionsState = {
  transactions: [],
  metaData: null,
  loading: false,
  error: null,
  filters: {},
  exporting: false,
  exportError: null,
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
      })
      .addCase(exportTransactions.pending, state => {
        state.exporting = true;
        state.exportError = null;
      })
      .addCase(exportTransactions.fulfilled, state => {
        state.exporting = false;
      })
      .addCase(exportTransactions.rejected, (state, action) => {
        state.exporting = false;
        state.exportError = action.payload as string;
      });
  },
});

export const { setTransactionFilters, resetTransactionFilters } = transactionSlice.actions;
export default transactionSlice.reducer;
