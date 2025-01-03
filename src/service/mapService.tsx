/* eslint-disable @typescript-eslint/no-explicit-any */

export const mapService = {
  fetchMapDataGriddata: async (params: any) => {
    const response = await fetch(
      "https://geogptdev.ckdigital.in/api/getwardData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );
    return response.json();
  },
};
