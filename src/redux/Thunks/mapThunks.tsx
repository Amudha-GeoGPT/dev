// Define the structure of an outlet
interface Outlet {
  pid: string;
  latitude: number;
  longitude: number;
  outletName: string;
  overallScore: number;
  realityScore: number;
  censusCode?: string;
}

// Define the structure of the API response
interface FetchLocationDataResponse {
  results: { outletDetails: Outlet[] }[];
}

import { createAsyncThunk } from '@reduxjs/toolkit';
import { mapService } from '../../service/mapService';
import { setFilteredMarkers, setLoading, setError } from '../Slice/mapSlice';

// Use the defined response type
export const fetchLocationDataThunk = createAsyncThunk<FetchLocationDataResponse, { category: string; district: string; page?: number; limit?: number }>(
  'map/fetchLocationData',
  async (params, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const data = await mapService.fetchLocationData(params);

      if (data.results && data.results.length > 0) {
        const outlets = data.results.flatMap(result => result.outletDetails);
        dispatch(setFilteredMarkers(outlets));
      } else {
        dispatch(setFilteredMarkers([]));
      }

      return data; // Return the data to be used in the component
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch(setError(errorMessage));
      dispatch(setFilteredMarkers([]));
      throw error; // Re-throw the error to handle it in the component if needed
    } finally {
      dispatch(setLoading(false));
    }
  }
);