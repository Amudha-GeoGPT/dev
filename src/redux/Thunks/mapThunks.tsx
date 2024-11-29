/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { mapService } from '../../service/mapService';
import { setFilteredMarkers, setLoading, setError } from '../Slice/mapSlice';
import { LocationDataParams } from '../../service/types/map';

export const fetchLocationDataThunk = createAsyncThunk(
  'map/fetchLocationData',
  async (params: LocationDataParams, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const data = await mapService.fetchLocationData(params);
      
      if (data.results && data.results.length > 0) {
        const outlets = data.results.flatMap((result: any) => result.outletDetails);
        dispatch(setFilteredMarkers(outlets));
      } else {
        dispatch(setFilteredMarkers([]));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch(setError(errorMessage));
      dispatch(setFilteredMarkers([]));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
