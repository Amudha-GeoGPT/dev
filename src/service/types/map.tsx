// export interface Outlet {
//     censusCode: string;
//     latitude: number;
//     longitude: number;
//     outletName: string;
//     overallScore: string;
//     pid: string;
//     realityScore: number;
//   }
  
  // export interface LocationDataParams {
  //   category: string;
  //   district: string;
  // }
  // File: ../../service/types/map.ts
export interface LocationDataParams {
  category: string;
  district: string;
  page?: number; // Add page property
  limit?: number; // Add limit property
}
// Define the structure of an outlet
export interface Outlet {
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