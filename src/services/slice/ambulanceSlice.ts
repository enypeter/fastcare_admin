import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { fetchAmbulances } from "../thunks";
import { AmbulanceState, Ambulance } from "@/types";


const initialState: AmbulanceState = {
  ambulances: [],
  selectedAmbulance: null,
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  updateLoading: false,
  updateError: null,
};

const ambulanceSlice = createSlice({
  name: "ambulances",
  initialState,
  reducers: {
    setSelectedAmbulance: (state, action: PayloadAction<Ambulance | null>) => {
      state.selectedAmbulance = action.payload;
    },

    clearAmbulances: (state) => {
      state.ambulances = [];
      state.selectedAmbulance = null;
      state.error = null;
    },
    
    // Update ambulance in the list (for optimistic updates)
    updateAmbulanceInList: (state, action: PayloadAction<Ambulance>) => {
      const index = state.ambulances.findIndex(amb => amb.id === action.payload.id);
      if (index !== -1) {
        state.ambulances[index] = action.payload;
      }
      // Also update selected ambulance if it's the same one
      if (state.selectedAmbulance?.id === action.payload.id) {
        state.selectedAmbulance = action.payload;
      }
    },
    
    removeAmbulanceFromList: (state, action: PayloadAction<string>) => {
      state.ambulances = state.ambulances.filter(amb => amb.id !== action.payload);
      if (state.selectedAmbulance?.id === action.payload) {
        state.selectedAmbulance = null;
      }
    },
    
   
    addAmbulanceToList: (state, action: PayloadAction<Ambulance>) => {
      state.ambulances.unshift(action.payload); 
    },
    
    // Clear all errors
    clearErrors: (state) => {
      state.error = null;
      state.createError = null;
      state.updateError = null;
     
    },
    

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all ambulances
      .addCase(fetchAmbulances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmbulances.fulfilled, (state, action: PayloadAction<Ambulance[]>) => {
        state.loading = false;
        state.ambulances = action.payload;
        state.error = null;
        
  
        if (action.payload.length > 0) {
          toast.success(`Loaded ${action.payload.length} ambulances`);
        }
      })
      .addCase(fetchAmbulances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.ambulances = [];
        
   
        toast.error(action.payload as string || "Failed to fetch ambulances");
      });
  },
});

export const {
  setSelectedAmbulance,
  clearAmbulances,
  updateAmbulanceInList,
  removeAmbulanceFromList,
  addAmbulanceToList,
  clearErrors,
  setLoading,
} = ambulanceSlice.actions;

export default ambulanceSlice.reducer;