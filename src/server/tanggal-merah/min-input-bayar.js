import { AuthGetApi } from "@/lib/fetchApi";
export const minInputBayar = async (data) => {
  let response = await AuthGetApi("/tgl-merah/min-tgl-bayar");
  return response;
};
