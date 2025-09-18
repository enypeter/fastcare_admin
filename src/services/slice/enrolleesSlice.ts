// src/store/slices/enrolleesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axiosInstance";

export interface Individual {
  id: string;
  individual_id: string;
  name: string;
  gender: string;
  class: string;
  type: string;
  action?: string;
}

export interface Corporate {
  id: string;
  individual_id: string;
  name: string;
  email: string;
  phone: string;
  contact: string;
  category: string;
  type: string;
  action?: string;
}

interface EnrolleesState {
  individuals: Individual[];
  corporates: Corporate[];
  loading: boolean;
  error: string | null;
}

const initialState: EnrolleesState = {
  individuals: [],
  corporates: [],
  loading: false,
  error: null,
};

// ✅ Fetch Individual Enrollees
export const fetchIndividuals = createAsyncThunk(
  "enrollees/fetchIndividuals",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.get("/enrollees/individual");
      return res.data.data; // adjust based on API response
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch individuals");
    }
  }
);

// ✅ Fetch Corporate Enrollees
export const fetchCorporates = createAsyncThunk(
  "enrollees/fetchCorporates",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.get("/enrollees/corporate");
      return res.data.data; // adjust based on API response
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch corporates");
    }
  }
);

const enrolleesSlice = createSlice({
  name: "enrollees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Individuals
      .addCase(fetchIndividuals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIndividuals.fulfilled, (state, action) => {
        state.loading = false;
        state.individuals = action.payload;
      })
      .addCase(fetchIndividuals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Corporates
      .addCase(fetchCorporates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCorporates.fulfilled, (state, action) => {
        state.loading = false;
        state.corporates = action.payload;
      })
      .addCase(fetchCorporates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default enrolleesSlice.reducer;
