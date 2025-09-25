import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HospitalState, Hospital } from "@/types";
import { fetchHospitalById, fetchHospitals, updateHospital } from "../thunks";
import toast from "react-hot-toast";

const initialState: HospitalState = {
  hospitals: [],
  selectedHospital: null,   // ✅ add this
  loading: false,
  error: null,
};

const hospitalSlice = createSlice({
  name: "hospitals",
  initialState,
  reducers: {
    setSelectedHospital: (state, action: PayloadAction<Hospital | null>) => {
      state.selectedHospital = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchHospitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitals = action.payload;
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch by ID
      .addCase(fetchHospitalById.fulfilled, (state, action) => {
        state.selectedHospital = action.payload;
      })

     .addCase(updateHospital.fulfilled, (state, action) => {
        // Optimistically update local state
        state.hospitals = state.hospitals.map((h) =>
          h.id === action.payload.id ? action.payload : h
        );
           toast.success("Hospital Updated successful 🎉");
      });
  },
});

export const { setSelectedHospital } = hospitalSlice.actions;
export default hospitalSlice.reducer;
