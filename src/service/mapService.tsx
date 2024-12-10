/* eslint-disable @typescript-eslint/no-explicit-any */
 
// import {
//   LocationDataParams,
//   FetchLocationDataResponse,
//   DistributorResponse
// } from './types/map';

export const mapService = {
  fetchMapResults: async (params: any) => {
    const response = await fetch(
      "https://geogptdev.ckdigital.in/api/getmapresult",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params)
      }
    );
    return response.json();
  },

  fetchFilterData: async (params: any) => {
    const response = await fetch(
      "https://geogptdev.ckdigital.in/api/getmapresult",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params)
      }
    );
    return response.json();
  },

  fetchDistributorData: async () => {
    const response = await fetch(
      "https://geogptdev.ckdigital.in/api/getdistfilter",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    return response.json();
  }
};
