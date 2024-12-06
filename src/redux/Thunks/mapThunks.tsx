/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { mapService } from '../../service/mapService';
import { setFilteredMarkers, setLoading, setError, setDistributorData } from '../Slice/mapSlice';
import { FetchLocationDataResponse, DistributorResponse } from '../../service/types/map';
 
interface FetchLocationParams {
  category: string;
  district: string;
  page?: number;
  limit?: number;
}
 
export const fetchLocationDataThunk = createAsyncThunk<
  FetchLocationDataResponse,
  FetchLocationParams
>(
  'map/fetchLocationData',
  async (params, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
 
      const data = await mapService.fetchLocationData(params);
 
      if (data.results && data.results.length > 0) {
        const outlets = data.results.flatMap((result: { outletDetails: any; }) => result.outletDetails);
        dispatch(setFilteredMarkers(outlets));
      } else {
        dispatch(setFilteredMarkers([]));
      }
 
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch(setError(errorMessage));
      dispatch(setFilteredMarkers([]));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
 
export const fetchDistributorDataThunk = createAsyncThunk<
  DistributorResponse,
  void
>(
  'map/fetchDistributorData',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const data = await mapService.fetchDistributorData();
      dispatch(setDistributorData(data.results));
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
