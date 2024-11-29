import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Outlet } from '../../service/types/map';

interface MapState {
  filteredMarkers: Outlet[];
  loading: boolean;
  error: string | null;
  selectedState: string;
  selectedDistrict: string;
  selectedCategory: string;
}

const initialState: MapState = {
  filteredMarkers: [],
  loading: false,
  error: null,
  selectedState: "TAMIL NADU",
  selectedDistrict: "Chennai",
  selectedCategory: ""
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setFilteredMarkers: (state, action: PayloadAction<Outlet[]>) => {
      state.filteredMarkers = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSelectedState: (state, action: PayloadAction<string>) => {
      state.selectedState = action.payload;
    },
    setSelectedDistrict: (state, action: PayloadAction<string>) => {
      state.selectedDistrict = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    }
  }
});

export const { 
  setFilteredMarkers, 
  setLoading, 
  setError,
  setSelectedState,
  setSelectedDistrict,
  setSelectedCategory 
} = mapSlice.actions;

export default mapSlice.reducer;
