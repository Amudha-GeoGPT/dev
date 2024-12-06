import {
  LocationDataParams,
  FetchLocationDataResponse,
  DistributorResponse
} from './types/map';
 
export const mapService = {
  fetchLocationData: async ({ category, district }: LocationDataParams): Promise<FetchLocationDataResponse> => {
    const response = await fetch(
      "https://geogptdev.ckdigital.in/api/filter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stateName: "TAMIL NADU",
          districtName: district,
          subdistrictName: "",
          villageTownName: "",
          category: category,
        }),
      }
    );
 
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch location data');
    }
    return data;
  },
 
  fetchDistributorData: async (): Promise<DistributorResponse> => {
    const response = await fetch(
      "https://geogptdev.ckdigital.in/api/getdistfilter",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
   
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch distributor data');
    }
    return data;
  }
};

 