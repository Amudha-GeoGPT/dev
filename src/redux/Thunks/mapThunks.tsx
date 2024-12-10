/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { mapService } from '../../service/mapService';
import { 
  setLoading, 
  setError, 
  setDistributorData,
  setOutletData
} from '../Slice/mapSlice';

// Define the structure of a district object if known
interface District {
  [key: string]: any;
}

// Define the structure of the state data
interface StateData {
  [state: string]: District[];
}

// Thunk to fetch map results including pincode
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
        pincode,
        category: ""
      });
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

// Thunk to fetch filter data
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

// Thunk to fetch distributor data and sort districts
export const fetchDistributorDataThunk = createAsyncThunk(
  'map/fetchDistributorData',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const data = await mapService.fetchDistributorData();
      
      // Sort the districts for each state
      const sortedData: StateData = Object.keys(data.results).reduce((acc, state) => {
        const districts = data.results[state];
        const sortedDistricts = districts.sort((a: {}, b: {}) => {
          const districtA = Object.keys(a)[0];
          const districtB = Object.keys(b)[0];
          return districtA.localeCompare(districtB);
        });
        acc[state] = sortedDistricts;
        return acc;
      }, {} as StateData);

      dispatch(setDistributorData(sortedData));
      return sortedData;
    } catch (error) {
      dispatch(setError('Failed to fetch distributor data'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);