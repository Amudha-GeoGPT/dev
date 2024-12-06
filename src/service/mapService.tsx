import { LocationDataParams } from '../service/types/map';

export const mapService = {
  fetchLocationData: async ({ category, district }: LocationDataParams) => {
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
          // pincode: "600028",
          category: category,
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch location data');
    }
    return data;
  }
};
