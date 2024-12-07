// Basic outlet interface
export interface Outlet {
  pid: string;
  latitude: number;
  longitude: number;
  outletName: string;
  overallScore: number;
  realityScore: number;
  censusCode?: string;
  shopImage?: string;
}

export interface LocationDataParams {
  category: string;
  district: string;
  page?: number;
  limit?: number;
}

export interface FetchLocationDataResponse {
  results: { outletDetails: Outlet[] }[];
}

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
