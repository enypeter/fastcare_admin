
import { AmenitiesState, Amenity } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { createAmenity, fetchAmenities, fetchAmenityById, updateAmenity } from "../thunks";

const initialState: AmenitiesState = {
  amenities: [],
  selectedAmenity: null,
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  updateLoading: false,
  updateError: null,
};

const amenitiesSlice = createSlice({
  name: "amenities",
  initialState,
  reducers: {
    setSelectedAmenity: (state, action: PayloadAction<Amenity | null>) => {
      state.selectedAmenity = action.payload;
    },
    clearAmenitiesError: (state) => {
      state.error = null;
      state.createError = null;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all amenities
      .addCase(fetchAmenities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmenities.fulfilled, (state, action) => {
        state.loading = false;
        state.amenities = action.payload;
      })
      .addCase(fetchAmenities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string || "Failed to fetch amenities");
      })

      // Fetch amenity by ID
      .addCase(fetchAmenityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmenityById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAmenity = action.payload;
      })
      .addCase(fetchAmenityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string || "Failed to fetch amenity");
      })

      // Create amenity
      .addCase(createAmenity.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createAmenity.fulfilled, (state, action) => {
        state.createLoading = false;
        state.amenities.push(action.payload);
        toast.success("Amenity created successfully 🎉");
      })
      .addCase(createAmenity.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
        toast.error(action.payload as string || "Failed to create amenity");
      })

      // Update amenity
      .addCase(updateAmenity.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateAmenity.fulfilled, (state, action) => {
        state.updateLoading = false;
        // Optimistically update local state
        state.amenities = state.amenities.map((amenity) =>
          amenity.equipmentName === action.payload.equipmentName ? action.payload : amenity
        );
        
        // Update selected amenity if it's the one being updated
        if (state.selectedAmenity?.equipmentName === action.payload.equipmentName) {
          state.selectedAmenity = action.payload;
        }
        
        toast.success("Amenity updated successfully 🎉");
      })
      .addCase(updateAmenity.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload as string;
        toast.error(action.payload as string || "Failed to update amenity");
      })

  },
});

export const { setSelectedAmenity, clearAmenitiesError } = amenitiesSlice.actions;
export default amenitiesSlice.reducer;