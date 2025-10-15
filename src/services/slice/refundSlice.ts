import { createSlice } from '@reduxjs/toolkit';
import { createRefund, exportRefunds, exportRefundDetail, fetchRefundById, fetchRefunds } from '../thunks';
import { RefundsState, Refund } from '@/types';

const initialState: RefundsState = {
  refunds: [],
  metaData: null,
  loading: false,
  error: null,
  creating: false,
  createError: null,
  selectedRefund: null,
  exporting: false,
  exportError: null,
  exportingDetail: false,
  exportDetailError: null,
  filters: {},
};

const refundSlice = createSlice({
  name: 'refunds',
  initialState,
  reducers: {
    setRefundFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetRefundFilters(state) {
      state.filters = {};
    },
    clearSelectedRefund(state){
      state.selectedRefund = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRefunds.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRefunds.fulfilled, (state, action) => {
        state.loading = false;
        state.refunds = action.payload.refunds;
        state.metaData = action.payload.metaData;
      })
      .addCase(fetchRefunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRefundById.fulfilled, (state, action) => {
        state.selectedRefund = action.payload as Refund;
      })
      .addCase(createRefund.pending, state => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createRefund.fulfilled, state => {
        state.creating = false;
      })
      .addCase(createRefund.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload as string;
      })
      .addCase(exportRefunds.pending, state => {
        state.exporting = true;
        state.exportError = null;
      })
      .addCase(exportRefunds.fulfilled, state => {
        state.exporting = false;
      })
      .addCase(exportRefunds.rejected, (state, action) => {
        state.exporting = false;
        state.exportError = action.payload as string;
      })
      .addCase(exportRefundDetail.pending, state => {
        state.exportingDetail = true;
        state.exportDetailError = null;
      })
      .addCase(exportRefundDetail.fulfilled, state => {
        state.exportingDetail = false;
      })
      .addCase(exportRefundDetail.rejected, (state, action) => {
        state.exportingDetail = false;
        state.exportDetailError = action.payload as string;
      });
  },
});

export const { setRefundFilters, resetRefundFilters, clearSelectedRefund } = refundSlice.actions;
export default refundSlice.reducer;
