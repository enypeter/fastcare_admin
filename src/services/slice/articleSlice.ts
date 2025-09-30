import { createSlice } from "@reduxjs/toolkit";
import { createArticles, fetchArticles } from "../thunks";
import { ArticleState } from "@/types";

const initialState: ArticleState = {
  articles: [],
  metaData: null,
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchArticles.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles; 
        state.metaData = action.payload.metaData;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createArticles.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createArticles.fulfilled, (state) => {
        state.createLoading = false;
       })
       .addCase(createArticles.rejected, (state, action) => {
         state.createLoading = false;
         state.createError = action.payload as string;
      });
  },
});

export default articleSlice.reducer;
