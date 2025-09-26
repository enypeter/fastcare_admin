import { createSlice } from "@reduxjs/toolkit";
import { fetchFAQs, addFAQ, deleteFAQ } from "../thunks";
import { FAQState } from "@/types";



const initialState: FAQState = {
  faqs: [],
  loading: false,
  error: null,
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch FAQs
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add FAQ
      .addCase(addFAQ.fulfilled, (state, action) => {
        state.faqs.unshift(action.payload); // optimistic update
      })
       .addCase(deleteFAQ.fulfilled, (state, action) => {
        state.faqs = state.faqs.filter(f => f.id !== Number(action.payload));
        })
      .addCase(deleteFAQ.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default faqSlice.reducer;
