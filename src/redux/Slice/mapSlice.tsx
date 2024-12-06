import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Outlet, StateData, Distributor } from '../../service/types/map';
 
interface MapState {
  filteredMarkers: Outlet[];
  loading: boolean;
  error: string | null;
  selectedState: string;
  selectedDistrict: string;
  selectedCategory: string;
  selectedVertical: string;
  selectedDistributor: string;
  selectedDistance: number;
  distributorData: StateData | null;
  availableDistricts: string[];
  availableDistributors: Distributor[];
  selectedLatitude: number | null;
  selectedLongitude: number | null;
}
 
const initialState: MapState = {
  filteredMarkers: [],
  loading: false,
  error: null,
  selectedLatitude: null,
  selectedLongitude: null,
  selectedState: "TAMIL NADU",
  selectedDistrict: "Chennai",
  selectedCategory: "",
  selectedVertical: '',
  selectedDistributor: '',
  selectedDistance: 50,
  distributorData: null,
  availableDistricts: [],
  availableDistributors: [],
  // distributorData: null,
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
    },
    setSelectedVertical: (state, action: PayloadAction<string>) => {
      state.selectedVertical = action.payload;
    },
    setSelectedDistributor: (state, action: PayloadAction<string>) => {
      state.selectedDistributor = action.payload;
    },
    setSelectedDistance: (state, action: PayloadAction<number>) => {
      state.selectedDistance = action.payload;
    },
    setDistributorData: (state, action: PayloadAction<StateData>) => {
      state.distributorData = action.payload;
    },
    setAvailableDistricts: (state, action: PayloadAction<string[]>) => {
      state.availableDistricts = action.payload;
    },
    setAvailableDistributors: (state, action: PayloadAction<Distributor[]>) => {
      state.availableDistributors = action.payload;
    },
    setSelectedLatitude: (state, action: PayloadAction<number | null>) => {
      state.selectedLatitude = action.payload;
    },
    setSelectedLongitude: (state, action: PayloadAction<number | null>) => {
      state.selectedLongitude = action.payload;
    }
  }
});
 
export const {
  setFilteredMarkers,
  setLoading,
  setError,
  setSelectedState,
  setSelectedDistrict,
  setSelectedCategory,
  setSelectedVertical,
  setSelectedDistributor,
  setSelectedDistance,
  setDistributorData,
  setAvailableDistricts,
  setAvailableDistributors
} = mapSlice.actions;
 
export default mapSlice.reducer;
//slice
 