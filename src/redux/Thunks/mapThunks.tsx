 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { mapService } from '../../service/mapService';
import { 
  setLoading, 
  setError, 
  setDistributorData,
  setOutletData 
} from '../Slice/mapSlice';

// Updated thunk to include pincode
export const fetchMapResultsThunk = createAsyncThunk(
  'map/fetchMapResults',
  async ({ distributorName, latitude, longitude, distance, pincode }: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await mapService.fetchMapResults({
        vertical: "sales",
        distributorName,
        latitude,
        longitude,
        distance,
        pincode, // Include pincode in the request
        category: ""
      });
      // Ensure response is an array
      dispatch(setOutletData(response.results || []));
      return response;
    } catch (error) {
      dispatch(setError('Failed to fetch map results'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchFilterDataThunk = createAsyncThunk(
  'map/fetchFilterData',
  async (params: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await mapService.fetchFilterData(params);
      if (response.results) {
        dispatch(setOutletData(response.results));
      }
      return response;
    } catch (error) {
      dispatch(setError('Failed to fetch filter data'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchDistributorDataThunk = createAsyncThunk(
  'map/fetchDistributorData',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const data = await mapService.fetchDistributorData();
      dispatch(setDistributorData(data.results));
      return data;
    } catch (error) {
      dispatch(setError('Failed to fetch distributor data'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);