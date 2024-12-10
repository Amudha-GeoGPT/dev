// Basic outlet interface
export interface Outlet {
  pid: string;
  latitude: number;
  longitude: number;
  outletName: string;
  overallScore: number;
  realityScore: number;
  censusCode?: string;
}

// Parameters interface for API calls
export interface LocationDataParams {
  category: string;
  district: string;
  page?: number;
  limit?: number;
}

// API Response interfaces
export interface FetchLocationDataResponse {
  results: { outletDetails: Outlet[] }[];
}

// Distributor related interfaces
export interface Distributor {
  distributorCode: number;
  distributorName: string;
  latitude: number;
  longitude: number;
}

export interface DistrictData {
  [key: string]: {
    distributor_list: Distributor[];
  };
}

export interface StateData {
  [key: string]: DistrictData[];
}

export interface DistributorResponse {
  results: StateData;
}
